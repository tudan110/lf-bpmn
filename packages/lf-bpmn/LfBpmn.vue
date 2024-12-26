<template>
  <div class="life-cycle" ref="life-cycle">

    <div>
      <el-button
          size="small"
          plain
          type="primary"
          @click="save()"
          icon="el-icon-check"
      >保存
      </el-button>
    </div>

    <div class="life-cycle-items">

      <!-- 画布 -->
      <div class="container" ref="container">
      </div>

      <div class="main">

        <!-- 节点面板 -->
        <div class="node-panel-main">
          <node-panel :lf="lf"
                      :custom-components-metadata="customComponentsMetadata"
                      v-bind="$attrs"
                      @set_countPosition="set_countPosition"/>
          <div
              class="node-panel-expand"
              @click="changeExpandedNodePanel"
          >
            <i v-if="expandedNodePanel" class="el-icon-d-arrow-left" title="收起"/>
            <i v-else class="el-icon-d-arrow-right" title="展开"/>
          </div>
        </div>

        <div class="right">
          <div class="rightRight">
            <!--<edit-properties
                ref="editProperties"
                :show-query="showQuery"
                :lf="lf"
                :clickedTreeItem="clickedTreeItem"
                :clickedElement="clickedElement"
                :elementType="elementType"
                :api-info-form="apiInfoForm"
                @set_formInput="set_formInput"
                @set_countPosition="set_countPosition"
            />-->
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">

// 工具类
import extend from './utils/extend'

// xml 处理
import {Json2Xml} from './components/adapter/json2xml'
import {adapterOut} from './components/adapter/adapterOut'

// LogicFlow
import LogicFlow from '@logicflow/core' // 引入LogicFlow核心库
import '@logicflow/core/dist/index.css' // 引入LogicFlow样式
import {BpmnAdapter, BpmnElement, BpmnXmlAdapter, Menu} from '@logicflow/extension' // 引入LogicFlow扩展库
import '@logicflow/extension/lib/style/index.css' // 引入LogicFlow扩展库样式
// 节点
import StartEvent from './components/bpmn/events/StartEvent'
import EndEvent from './components/bpmn/events/EndEvent'
import ExclusiveGateway from './components/bpmn/gateways/ExclusiveGateway'
import ParallelGateway from './components/bpmn/gateways/ParallelGateway'
import TimerIntermediateCatchEvent from './components/bpmn/events/TimerIntermediateCatchEvent'
import UserTask from './components/bpmn/tasks/UserTask'
import ServiceTask from './components/bpmn/tasks/ServiceTask'
import ScriptTask from './components/bpmn/tasks/ScriptTask'

// 组件
// import EditProperties from './components/editProperties'
import NodePanel from './components/panel/nodes/nodePanel'

export default {
  name: 'LfBpmn',
  components: {
    // EditProperties,
    NodePanel,
  },
  props: {
    showQuery: Boolean,
    apiInfoForm: Object,
    customComponents: {
      type: Array,
      default: () => []
    },
  },
  provide() {
    return {
      provideApiQuerySchema: () => this.apiInfoForm.queryParamsSchema,
      provideApiBodySchema: () => this.apiInfoForm.inputParamsSchema,
      provideApiQueryParams: () => this.queryParams,
      provideApiInputParams: () => this.inputParams,
      provideApiId: () => this.apiId,
      provideModelId: () => this.modelId
    }
  },
  computed: {
    customComponentsMetadata() {
      return this.customComponents.map(item => {
        return {
          name: item.name,
          icon: item.icon,
          type: item.type,
        }
      })
    }
  },
  data() {
    return {
      queryParams: [], // query 入参
      inputParams: [], // body 入参
      apiId: null,
      modelId: null,
      expandedNodePanel: true,
      lf: null,
      isSilentMode: false, // 是否静默模式静默默认表示节点不能被拖动
      stopMoveGraph: false, //禁止移动画布
      stopScrollGraph: false, //禁止滚动移动画布
      clickedTreeItem: {},
      elementType: 'base',
      clickedElement: {},
    }
  },
  created() {

    this.$nextTick(() => {
      this.initLf()
    })

  },
  mounted() {
  },
  watch: {},
  methods: {
    changeExpandedNodePanel() {
      this.expandedNodePanel = !this.expandedNodePanel
      if (this.expandedNodePanel) {
        document.querySelector('.node-panel-main').style.width = '300px'
      } else {
        document.querySelector('.node-panel-main').style.width = '0'
      }
    },
    set_countPosition() {
      this.$nextTick(() => {
        this.countPosition()
      })
    },
    // 初始化
    initLf() {
      LogicFlow.use(Menu) // 注册菜单插件
      LogicFlow.use(BpmnElement) // 注册BPMN元素
      LogicFlow.use(BpmnAdapter) // 注册BPMN适配器
      LogicFlow.use(BpmnXmlAdapter) // 注册BPMN适配器
      // 初始化LogicFlow
      this.lf = new LogicFlow({
        container: this.$refs.container,
        grid: {
          size: 15,
          visible: true,
          type: 'mesh',
          config: {
            color: '#efefef',
            thickness: 1
          }
        },
        textEdit: false,
        adjustEdgeStartAndEnd: true, // 开启两端的调整连线功能
        isSilentMode: this.isSilentMode, // 静默模式，不触发事件
        stopMoveGraph: this.stopMoveGraph, // 禁止拖动画布
        stopScrollGraph: this.stopScrollGraph //禁止鼠标滚动移动画布
      })
      this.lf.setDefaultEdgeType('bpmn:sequenceFlow') // 设置边类型bpmn:sequenceFlow为默认类型

      /**
       * 注册自定义节点
       * 1. 继承 LogicFlow.BaseNode
       * 2. 重写 draw 方法
       * 3. 注册
       */
      this.lf.register(StartEvent) // 注册开始事件
      this.lf.register(EndEvent) // 注册结束事件
      this.lf.register(ExclusiveGateway) // 注册唯一条件
      this.lf.register(ParallelGateway) // 注册并行网关
      this.lf.register(TimerIntermediateCatchEvent) // 注册定时中间捕获事件
      this.lf.register(UserTask) // 注册用户任务
      this.lf.register(ServiceTask) // 注册服务任务
      this.lf.register(ScriptTask) // 注册脚本任务
      this.lf.batchRegister(this.customComponents) // 注册自定义节点

      // 初始化渲染
      this.lf.render(this.clickedTreeItem.flow_context)
      this.lf.renderRawData({
        'nodes': [
          {
            'id': 'startEvent_5b4f3e4c784e42b5bcf61ebb576ea85e',
            'type': 'bpmn:startEvent',
            'x': 640,
            'y': 186,
            'properties': {
              'bpmn:extensionElements': {
                'camunda:executionListener': {
                  '-delegateExpression': '${StartEvent}',
                  '-event': 'start'
                }
              },
              'width': 40,
              'height': 40
            },
            'text': {
              'x': 640,
              'y': 186,
              'value': '开始事件'
            }
          },
          {
            'id': 'serviceTask_526928bcb6da4c1ebb811ef78f466e49',
            'type': 'bpmn:serviceTask',
            'x': 640,
            'y': 383,
            'properties': {
              'bpmn:extensionElements': {
                'camunda:executionListener': {
                  '-delegateExpression': '${StartEvent}',
                  '-event': 'start'
                }
              },
              'width': 120,
              'height': 80
            },
            'text': {
              'x': 640,
              'y': 383,
              'value': '服务任务'
            }
          },
          {
            'id': 'endEvent_a9e6e0f474c94b2f8700fd5c83b8fc2f',
            'type': 'bpmn:endEvent',
            'x': 640,
            'y': 578,
            'properties': {
              'bpmn:extensionElements': {
                'camunda:executionListener': {
                  '-delegateExpression': '${EndEvent}',
                  '-event': 'end'
                }
              },
              'width': 40,
              'height': 40
            },
            'text': {
              'x': 640,
              'y': 578,
              'value': '结束事件'
            }
          }
        ],
        'edges': [
          {
            'id': 'Flow_92a6de9',
            'type': 'bpmn:sequenceFlow',
            'properties': {},
            'sourceNodeId': 'startEvent_5b4f3e4c784e42b5bcf61ebb576ea85e',
            'targetNodeId': 'serviceTask_526928bcb6da4c1ebb811ef78f466e49',
            'sourceAnchorId': 'startEvent_5b4f3e4c784e42b5bcf61ebb576ea85e_2',
            'targetAnchorId': 'serviceTask_526928bcb6da4c1ebb811ef78f466e49_0',
            'startPoint': {
              'x': 640,
              'y': 206
            },
            'endPoint': {
              'x': 640,
              'y': 343
            },
            'pointsList': [
              {
                'x': 640,
                'y': 206
              },
              {
                'x': 640,
                'y': 343
              }
            ]
          },
          {
            'id': 'Flow_eb5ac16',
            'type': 'bpmn:sequenceFlow',
            'properties': {},
            'sourceNodeId': 'serviceTask_526928bcb6da4c1ebb811ef78f466e49',
            'targetNodeId': 'endEvent_a9e6e0f474c94b2f8700fd5c83b8fc2f',
            'sourceAnchorId': 'serviceTask_526928bcb6da4c1ebb811ef78f466e49_2',
            'targetAnchorId': 'endEvent_a9e6e0f474c94b2f8700fd5c83b8fc2f_0',
            'startPoint': {
              'x': 640,
              'y': 423
            },
            'endPoint': {
              'x': 640,
              'y': 558
            },
            'pointsList': [
              {
                'x': 640,
                'y': 423
              },
              {
                'x': 640,
                'y': 558
              }
            ]
          }
        ]
      })
      // console.log('this.clickedTreeItem.flow_context', this.clickedTreeItem.flow_context)

      this.lf.on('node:dnd-add', (node) => {
        console.log('node:dnd-drag', node)
        const {eventCenter} = this.lf.graphModel
        eventCenter.emit('element:click', node)
      })

      // 监听节点点击事件
      this.lf.on('element:click', (node) => {

        // console.log('element:click', node)

        if (node.data.type === 'bpmn:sequenceFlow') {
          let sourceNodeType = this.lf.getNodeDataById(
              node.data.sourceNodeId
          ).type
          this.elementType =
              sourceNodeType === 'bpmn:exclusiveGateway' ||
              sourceNodeType === 'bpmn:parallelGateway'
                  ? 'bpmn:sequenceFlow4Gateway'
                  : 'bpmn:sequenceFlow'
        } else {
          this.elementType = node.data.type
        }

        this.clickedElement = node.data

        this.$emit('click', {
          type: this.elementType,
          data: node.data
        })

      })

      // 节点双击事件
      this.lf.on('node:dbclick', (node) => {
        if (node.data.type === 'bpmn:sequenceFlow') {
          let sourceNodeType = this.lf.getNodeDataById(
              node.data.sourceNodeId
          ).type
          this.elementType =
              sourceNodeType === 'bpmn:exclusiveGateway' ||
              sourceNodeType === 'bpmn:parallelGateway'
                  ? 'bpmn:sequenceFlow4Gateway'
                  : 'bpmn:sequenceFlow'
        } else {
          this.elementType = node.data.type
        }
      })

    },
    countPosition() {
      // 计算当前节点的左上角通过计算流程的高度和宽度，通过transformModel.focusOn的方法将数据移动到中心位置
      let {transformModel, width, height} = this.lf.graphModel
      width = this.$refs.container.offsetWidth || this.$refs['life-cycle'].parentNode.parentNode.offsetWidth - 50
      height = this.$refs.container.offsetHeight || this.$refs['life-cycle'].parentNode.parentNode.offsetHeight - 50
      let {nodes: nodedata} = this.lf.getGraphRawData()

      let distance_x = []
      let distance_y = []
      let targetX = 0
      let targetY = 0

      let node = extend.deepClone(nodedata).map((item) => {
        let x = parseFloat(item.x)
        let y = parseFloat(item.y)

        distance_x.push(item.x - 0)
        distance_y.push(item.y - 0)
        item.distance = x * x + y * y
        return item
      })
      distance_y.sort((a, b) => {
        return b - a
      })
      distance_x.sort((a, b) => {
        return b - a
      })

      node.sort((a, b) => {
        return b.distance - a.distance
      })
      if (node.length === 0) {
        return false
      }
      targetX =
          node[node.length - 1].x +
          (distance_x[0] - distance_x[distance_x.length - 1]) / 2
      targetY =
          node[node.length - 1].y +
          (distance_y[0] - node[node.length - 1].y) / 2 -
          (node[node.length - 1].y - distance_y[distance_y.length - 1]) / 2
      transformModel.focusOn(targetX, targetY, width, height)
    },
    // 更改当前画布的展示的状态
    updateConfig(boolean) {
      this.isSilentMode = boolean                      // 是否静默模式静默默认表示节点不能被拖动
      this.stopMoveGraph = false                       //禁止移动画布
      this.stopScrollGraph = boolean                   //禁止滚动移动画布
      const {editConfigModel} = this.lf.graphModel
      editConfigModel.updateEditConfig({
        stopMoveGraph: this.stopMoveGraph,
        isSilentMode: this.isSilentMode,
        stopScrollGraph: this.stopScrollGraph
      })
    },
    // 保存
    save() {

      let rawData = this.lf.getGraphRawData()
      if (!rawData.nodes.length
          && !rawData.edges.length) {
        // console.log("画布无内容")
        this.$modal.msgWarning('画布无内容')
      } else {

        let serviceTaskid = []
        let serviceTaskidnew = []
        let serviceTaskidlist = []

        let adapter = adapterOut(rawData)
        console.log('adapter----------------------------------->', adapter)
        let {
          ['bpmn:definitions']: {
            ['bpmn:process']: {
              ['bpmn:endEvent']: endEvent,
              ['bpmn:subProcess']: subProcess,
              ['bpmn:userTask']: userTask,
              ['bpmn:intermediateCatchEvent']: intermediateCatchEvent,
              ['bpmn:scriptTask']: scriptTask
            }
          }
        } = adapter
        if (Object.prototype.toString.call(endEvent) === '[object Object]') {
          endEvent = [endEvent]
        }
        if (Object.prototype.toString.call(subProcess) === '[object Object]') {
          subProcess = [subProcess]
        }

        if (Object.prototype.toString.call(intermediateCatchEvent) === '[object Object]') {
          intermediateCatchEvent = [intermediateCatchEvent]
        } else if (Object.prototype.toString.call(intermediateCatchEvent) === '[object Undefined]') {
          intermediateCatchEvent = []
        }

        if (Object.prototype.toString.call(scriptTask) === '[object Object]') {
          scriptTask = [scriptTask]
        } else if (
            Object.prototype.toString.call(scriptTask) === '[object Undefined]'
        ) {
          scriptTask = []
        }

        for (let i = 0; i < scriptTask.length; i++) {
          let scriptTask_text = ''
          Object.keys(scriptTask[i]).forEach((item) => {
            if (item.indexOf('bpmn:script') > -1) {
              if (
                  Object.prototype.toString.call(scriptTask[i][item]) === '[object Object]'
              ) {
                Object.keys(scriptTask[i][item]).forEach((it) => {
                  if (it.indexOf('#text') > -1) {
                    scriptTask_text = scriptTask[i][item][it]
                  }
                })
              } else {
                scriptTask_text = scriptTask[i][item].trimEnd()
              }
            }
          })

          if (scriptTask_text) {
            delete scriptTask[i]['-bpmn:script']
            scriptTask[i]['bpmn:script'] = {
              ['-#cdata']: scriptTask_text,
            }
          }
        }

        for (let i = 0; i < intermediateCatchEvent && intermediateCatchEvent.length; i++) {
          let extensionElements = intermediateCatchEvent[i]
          extensionElements['bpmn:extensionElements']['camunda:inputParameter'] = {
            ['camunda:inputOutput']: {
              '-#text': '',
            },
          }
        }

        // 解决默认情况下解决结束事件默认为空的情况下xml缺失的问题。
        for (let i = 0; i < endEvent && endEvent.length; i++) {
          let incoming = endEvent[i]['bpmn:incoming']
          if (
              !endEvent[i]['bpmn:extensionElements'] ||
              Object.keys(endEvent[i]['bpmn:extensionElements']).length === 0
          ) {
            endEvent[i]['bpmn:extensionElements'] = {
              ['camunda:inputOutput']: {
                ['-#text']: ''
              }
            }
            delete endEvent[i]['bpmn:incoming']
            endEvent[i]['bpmn:incoming'] = incoming
          }
        }
        //  解决用户节点多空格问题,先判空

        if (userTask) {
          if (Object.prototype.toString.call(userTask) === '[object Object]') {
            userTask = [userTask]
          }
          for (let i = 0; i < userTask.length; i++) {
            if (userTask[i]['bpmn:extensionElements']) {
              if (
                  Object.prototype.toString.call(
                      Object.keys(userTask[i]['bpmn:extensionElements'])[0]
                  ) !== '[object Object]'
              ) {
                userTask[i]['bpmn:extensionElements'] = {
                  ['camunda:inputOutput']: {['-#text']: ''}
                }
              }
            }
          }
        }

        if (adapter['bpmn:definitions']['bpmn:process']['bpmn:serviceTask']) {
          adapter['bpmn:definitions']['bpmn:process']['bpmn:serviceTask'] =
              JSON.parse(
                  JSON.stringify(
                      adapter['bpmn:definitions']['bpmn:process']['bpmn:serviceTask']
                  ).replaceAll('\\t\\n', '')
              )
        }

        let serviceTasknode =
            adapter['bpmn:definitions']['bpmn:process']['bpmn:serviceTask']
        if (serviceTasknode) {
          if (
              Object.prototype.toString.call(serviceTasknode) === '[object Object]'
          ) {
            serviceTaskidlist.push(serviceTasknode)
          } else {
            serviceTaskidlist = serviceTasknode
          }

          // 服务节是否循环 关闭循环的时候将 自定义节点的 multiInstanceLoopCharacteristics 删除
          for (let i = 0; i < serviceTaskidlist.length; i++) {
            let multiInstanceLoopCharacteristics = serviceTaskidlist[i]['bpmn:multiInstanceLoopCharacteristics']
                ? JSON.parse(
                    JSON.stringify(
                        serviceTaskidlist[i]['bpmn:multiInstanceLoopCharacteristics']
                    )
                ) : ''
            delete serviceTaskidlist[i]['bpmn:multiInstanceLoopCharacteristics']
            if (
                multiInstanceLoopCharacteristics &&
                Object.keys(multiInstanceLoopCharacteristics).length > 0
            ) {
              serviceTaskidlist[i]['bpmn:multiInstanceLoopCharacteristics'] =
                  multiInstanceLoopCharacteristics
            }

            // 不将新增的字段参数添加上
            if (serviceTaskidlist[i]['-dirflowsid']) {
              serviceTaskid.push(serviceTaskidlist[i]['-id'])
              serviceTaskidnew.push(
                  serviceTaskidlist[i]['-id']
              )
              delete serviceTaskidlist[i]['-dirflowsid']
            }
          }
        }
        adapter['bpmn:definitions']['-xmlns:camunda'] =
            'http://camunda.org/schema/1.0/bpmn'
        adapter['bpmn:definitions']['-id'] =
            'd' + adapter['bpmn:definitions']['-id'].slice(1)
        adapter['bpmn:definitions']['bpmn:process']['-isExecutable'] = 'true'
        this.clickedTreeItem.flowContext =
            '<?xml version="1.0" encoding="UTF-8"?>' + Json2Xml(adapter)
        console.log('this.clickedTreeItem.id', this.clickedTreeItem)
        let obj = {}
        obj.flowContext = this.clickedTreeItem.flowContext //xml文件
        obj.formInput = this.clickedTreeItem.form_input //入参
        console.log('obj.formInput', obj.formInput)
        obj.flow_name = this.clickedTreeItem.flow_name // 流程名称
        obj.flow_describe = this.clickedTreeItem.flow_detail // 流程描述
        // 流程的同步异步，由api定义

        console.log(
            'this.clickedTreeItem.flowContext---------------------',
            serviceTaskid,
            serviceTaskidnew,
            serviceTaskidlist
        )
        // 服务节点id的拼接
        if (serviceTaskidnew && serviceTaskidnew.length > 0) {
          for (let i = 0; i < serviceTaskidnew.length; i++) {
            obj.flowContext = obj.flowContext.replaceAll(
                serviceTaskid[i],
                serviceTaskidnew[i]
            )
          }
        }

        console.log('obj', obj)

      }
    },
  }
}
</script>

<style lang="scss" scoped>
.life-cycle {
  width: 100%;
  height: 100vh;
  background-color: #aaa;

  div::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  div::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 0px;
    background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
    );
  }

  div::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 0px;
  }

  .life-cycle-items {
    position: relative;
    width: 100%;
    height: 100%;

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      z-index: 299;
    }

    .main {
      display: flex;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      border: 1px solid #1c84c6;
      box-sizing: border-box;

      .node-panel-main {
        position: relative;
        right: 2px;
        width: 300px;
        background: #ffffff;
        box-shadow: 2px 2px 4px 0 rgba(198, 198, 198, 0.5);
        z-index: 300;
      }

      .node-panel-expand {
        cursor: pointer;
        width: 16px;
        height: 32px;
        position: absolute;
        right: -16px;
        top: 50%;
        margin-top: -16px;
        z-index: 300;
        color: #FFFFFF;
        background: #1890ff;
        box-shadow: 2px 2px 4px 0 rgba(198, 198, 198, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;

      }

      .right {
        flex: 1;
        position: relative;
        //left: 2px;

        .rightTop {
          position: absolute;
          width: 100%;
          top: 0;
          //height: 150px;
          background: #ffffff;
          box-shadow: -2px 2px 4px 0px rgba(198, 198, 198, 0.5);
          z-index: 300;
        }

        .rightBottom {
          position: absolute;
          width: 100%;
          bottom: 0;
          //height: 350px;
          background-color: #ffffff;
          box-shadow: -2px 2px 4px 0px rgba(198, 198, 198, 0.5);
          overflow-y: auto;
          z-index: 300;
        }

        .rightRight {
          position: absolute;
          //width: 100%;
          height: 100%;
          right: 0;
          background-color: #ffffff;
          box-shadow: -2px 2px 4px 0px rgba(198, 198, 198, 0.5);
          overflow-y: auto;
          z-index: 300;
        }

      }

    }

    .settings {
      // width: 235px;
      min-width: 30px;
      height: 100%;
      background-color: #fff;
      box-shadow: -2px 2px 4px 0px rgba(198, 198, 198, 0.5);
      z-index: 222;
      overflow-y: auto;
    }
  }
}

::v-deep .lf-dndpanel {
  padding: 5px 10px 10px;

  .lf-dnd-item {
    margin-bottom: 5px;
  }

  .lf-dnd-text {
    font-size: 12px !important;
    color: #606266 !important;
  }
}

::v-deep .el-dialog__body {
  padding: 0 20px;
}

</style>
