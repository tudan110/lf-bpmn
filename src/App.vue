<template>
  <div id="app">
    <el-button
        size="small"
        plain
        type="primary"
        icon="el-icon-check"
        @click="getData()"
    >获取数据
    </el-button>
    <el-button
        size="small"
        plain
        type="primary"
        icon="el-icon-aim"
        @click="setPosition()"
    >定位
    </el-button>
    <el-button
        size="small"
        plain
        type="primary"
        icon="el-icon-check"
        @click="save()"
    >保存
    </el-button>
    <LfBpmn
        ref="lfBpmn"
        :show-toolbar="true"
        :custom-components="customComponents"
        :show-base-components="true"
        :show-task-components="true"
        :show-custom-components="true"
        :show-atomic-power-components="false"
        :graph-raw-data="graphRawData"
        @click="onClick"
    />
  </div>
</template>

<script>
import SendTask from './customComponents/SendTask'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      customComponents: [SendTask],
      graphRawData: {
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
      }
    }
  },
  methods: {
    onClick(node) {
      console.log(node)
    },
    getData() {
      console.log('graphRawData', this.getGraphRawData())
      console.log('bpmnXml', this.getBpmnXml())
    },
    getGraphRawData() {
      return this.$refs.lfBpmn.getGraphRawData()
    },
    getBpmnXml() {
      return this.$refs.lfBpmn.getBpmnXml()
    },
    setPosition() {
      this.$refs.lfBpmn.setPosition()
    },
    save() {
      this.$refs.lfBpmn.save()
    },
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
