<template>
  <div class="node-panel">

    <div class="fold_div">
      <div class="tree-title">
        <div @click="showBaseComponent = !showBaseComponent">
          <svg-icon
              icon-class="arrow-down"
              class="btn"
              v-if="showBaseComponent"
          />
          <svg-icon icon-class="arrow-right" class="btn" v-else/>
          <span>基础组件</span>
        </div>
      </div>
      <div class="component-box" v-if="showBaseComponent">
        <div
            class="component-item"
            v-for="(item, index) in componentsList"
            :key="index"
            @mousedown="$_dragNode(item)"
        >
          <svg-icon :icon-class="item.icon" class="component-icon"/>
          <span>{{ item.name }}</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import extend from '../../../utils/extend'
// API
import {bpmnNodeType} from '../../constants/bpmn-constant'

export default {
  //注册draggable组件
  components: {},
  props: {
    lf: Object,
  },
  data() {
    return {
      loading: false,
      // 是否显示基础组件
      showBaseComponent: true,
      // 是否显示原子能力库
      showServiceNode: true,
      // 节点列表
      componentsList: [
        {name: '开始节点', icon: 'start-event', type: 'bpmn:startEvent'},
        {name: '结束节点', icon: 'end-event', type: 'bpmn:endEvent'},
        {name: '排他网关', icon: 'exclusive-gateway', type: 'bpmn:exclusiveGateway'},
        {name: '并行网关', icon: 'parallel-gateway', type: 'bpmn:parallelGateway'},
        {name: '定时中间捕获事件', icon: 'timer-intermediate-catch-event', type: 'bpmn:intermediateCatchEvent'},
        {name: '用户任务', icon: 'user-task', type: 'bpmn:userTask'},
        {name: '脚本任务', icon: 'script-task', type: 'bpmn:scriptTask'},
      ],
      // 搜索参数
      searchParam: '',
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {
    /**
     * 拖拽节点
     * @param item
     */
    $_dragNode(item) {

      // 默认obj是开始节点的的设置
      let obj = {
        id: extend.getRandomUUID(),
        type: item.type,
        text: item.name,
        properties: {
          ['bpmn:extensionElements']: {
            ['camunda:executionListener']: {
              ['-delegateExpression']: '${StartEvent}',
              ['-event']: 'start'
            }
          }
        }
      }
      if (item.type === 'bpmn:endEvent') {
        obj.properties = {
          ['bpmn:extensionElements']: {
            ['camunda:executionListener']: {
              ['-delegateExpression']: '${EndEvent}',
              ['-event']: 'end'
            }
          }
        }
      } else if (item.type === 'bpmn:userTask') {
        obj.properties = {
          ['-name']: '用户任务',
          ['-camunda:assignee']: '',
          ['bpmn:extensionElements']: {
            ['camunda:inputOutput']: [{
              '#text': ''
            }]
          }
        }
      } else if (item.type === 'bpmn:exclusiveGateway' || item.type === 'bpmn:parallelGateway') {
        obj.properties = {}
      } else if (item.type === 'bpmn:intermediateCatchEvent') {
        // 定时中间捕获事件
        obj.properties = {
          ['-camunda:asyncBefore']: 'true',
          ['bpmn:extensionElements']: {

            ['camunda:inputParameter']: {

              ['camunda:inputOutput']: {
                '#text': ''
              }
            }
          },
          ['bpmn:timerEventDefinition']: {
            ['bpmn:timeCycle']: {
              ['-xsi:typ']: 'bpmn:tFormalExpression',
              ['-#text']: ''
            }
          }
        }

      } else if (item.type === 'bpmn:scriptTask') {

        obj.properties = {
          ['-name']: '脚本任务',
          ['-scriptFormat']: 'python',
          ['bpmn:script']: {
            ['-#cdata-section']: `def example(args):
    """
    示例函数

    参数:
    args (list): 包含多个元素的列表，例如: name, gender

    返回:
    dict: 字典，即 json 对象
    """

    # 校验参数长度
    if len(args) != 2:
        return {"status": "400", "msg": "Invalid number of arguments. Expected 2 arguments."}

    # 从参数列表中赋值
    # name, gender = args
    name = args[0]
    gender = args[1]

    # 验证参数是否为 None 或者去除空白后为空字符串
    errors = []
    if name is None or not name.strip():
        errors.append("name is required and cannot be empty or whitespace.")
    if gender is None or not gender.strip():
        errors.append("gender is required and cannot be empty or whitespace.")

    if errors:
        return {"status": "400", "msg": "Errors: " + " ".join(errors)}

    return {"name": name, "gender": gender, "status": "200", "msg": "ok"}
`
          }
        }

      }

      this.lf.dnd.startDrag(obj)
    },

    // 搜索节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.toUpperCase().includes(value.toUpperCase())
    },
    // 拖拽节点离开
    async dragLeave(node) {

      console.log('拖拽节点离开')

      // console.log("🚀 ~ file: nodePanel.vue:129 ~ dragLeave ~ node", node);
      if (node.data.pid === '-1') return

      try {

        let delegateExpression = '${AtomicAbilityTask}'
        if (node.data.abilityType === 'restful_api') {
          delegateExpression = '${AtomicAbilityTaskRestful}'
        }

        let xmlJson = {
          ['bpmn:definitions']: {
            ['bpmn:process']: {
              ['bpmn:serviceTask']: {
                ['-name']: node.data.abilityName,
                ['-camunda:delegateExpression']: delegateExpression,
                virtualCmdInputParamList: node.data.virtualCmdInputParamList,
                virtualCmdOutputParamList: node.data.virtualCmdOutputParamList
              }
            }
          }
        }

        let activityType = bpmnNodeType.serviceTask
        if (node.data.abilityType === 'restful_api') {
          activityType = bpmnNodeType.serviceTaskRestful
        }

        let nodeConfig = {
          id: `${extend.getRandomUUID()}_abilityId_${node.data.id}`,
          type: activityType,
          text: xmlJson['bpmn:definitions']['bpmn:process']['bpmn:serviceTask']['-name'],
          properties: xmlJson['bpmn:definitions']['bpmn:process']['bpmn:serviceTask']
        }

        nodeConfig.properties.dirflowsid = node.data.id

        this.lf.dnd.startDrag(nodeConfig)

      } catch (error) {
        this.$modal.msgError('该原子能力无法拖拽')
      }
    },
  },
  watch: {
    searchParam(val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang="scss" scoped>

.node-panel::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}

.node-panel::-webkit-scrollbar-thumb {
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

.node-panel::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 0px;
}

.node-panel, .node-panelanimal {
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  z-index: 222;
  user-select: none;

  div.fold_div, div.folded_div {
    min-height: calc(100% - 30px);
    min-width: 30px;
  }

  .divcion_tree {
    display: flex;
    align-items: center;
    position: sticky;
    bottom: 0px;
    left: 2px;
    width: 100%;
    text-align: left;
    text-indent: 5px;
    color: white;
    background: #1890ff;
    height: 30px;
  }

  .tree-title {
    height: 42px;
    line-height: 40px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: #606266;
    border-bottom: 1px solid #dbdde1;
    border-top: 1px solid #dbdde1;
    cursor: pointer;
    background-color: #f9f9f9;
  }

  .tree-title:nth-child(1) {
    display: flex;

    div:nth-child(1) {
      width: 95%;
    }
  }

  .search-tree {
    width: 100%;
    padding: 10px 10px;

    .tree {
      margin-top: 6px;

      .custom-tree-node {
        width: 100%;
        display: flex;

        .Ability-img {
          position: relative;
          left: -4px;
          top: -2px;

          .Ability-img-icon {
            width: 16px;
            height: 16px;
          }

        }

        .custom-tree-node__state {
          flex: 1;
        }

        .custom-tree-node__btns {
          display: none;
        }

        &:hover {
          .custom-tree-node__btns {
            display: inline-block;
          }
        }
      }
    }

    .mover {
      cursor: move;
    }
  }

  .node-name {
    width: 90%;
  }

  .component-box {
    padding: 0 25px 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .component-item {
      width: 44%;
      text-align: center;
      cursor: pointer;

      .component-icon {
        width: 24px;
        height: 24px;
        display: block;
        margin: 16px auto 6px;
      }

      span {
        font-size: 12px;
        color: #606266;
      }
    }
  }
}
</style>
