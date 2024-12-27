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
import CustomTask from './customComponents/CustomTask'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      customComponents: [CustomTask],
      graphRawData: {
        "nodes": [
          {
            "id": "startEvent_5b4f3e4c784e42b5bcf61ebb576ea85e",
            "type": "bpmn:startEvent",
            "x": 469,
            "y": 285,
            "properties": {
              "bpmn:extensionElements": {
                "camunda:executionListener": {
                  "-delegateExpression": "${StartEvent}",
                  "-event": "start"
                }
              },
              "width": 40,
              "height": 40
            },
            "text": {
              "x": 469,
              "y": 285,
              "value": "开始事件"
            }
          },
          {
            "id": "endEvent_a9e6e0f474c94b2f8700fd5c83b8fc2f",
            "type": "bpmn:endEvent",
            "x": 470,
            "y": 568,
            "properties": {
              "bpmn:extensionElements": {
                "camunda:executionListener": {
                  "-delegateExpression": "${EndEvent}",
                  "-event": "end"
                }
              },
              "width": 40,
              "height": 40
            },
            "text": {
              "x": 470,
              "y": 568,
              "value": "结束事件"
            }
          },
          {
            "id": "serviceTask_custom_c631f902b508464fb2b3a6cbd4471deb",
            "type": "bpmn:serviceTask-custom",
            "x": 470,
            "y": 425,
            "properties": {
              "bpmn:extensionElements": {
                "camunda:executionListener": {
                  "-delegateExpression": "${StartEvent}",
                  "-event": "start"
                }
              },
              "width": 64,
              "height": 64
            },
            "text": {
              "x": 470,
              "y": 425,
              "value": "自定义任务"
            }
          }
        ],
        "edges": [
          {
            "id": "Flow_a3f790a",
            "type": "bpmn:sequenceFlow",
            "properties": {},
            "sourceNodeId": "startEvent_5b4f3e4c784e42b5bcf61ebb576ea85e",
            "targetNodeId": "serviceTask_custom_c631f902b508464fb2b3a6cbd4471deb",
            "sourceAnchorId": "startEvent_5b4f3e4c784e42b5bcf61ebb576ea85e_2",
            "targetAnchorId": "serviceTask_custom_c631f902b508464fb2b3a6cbd4471deb_0",
            "startPoint": {
              "x": 469,
              "y": 305
            },
            "endPoint": {
              "x": 470,
              "y": 393
            },
            "pointsList": [
              {
                "x": 469,
                "y": 305
              },
              {
                "x": 469,
                "y": 349
              },
              {
                "x": 470,
                "y": 349
              },
              {
                "x": 470,
                "y": 393
              }
            ]
          },
          {
            "id": "Flow_d70cd36",
            "type": "bpmn:sequenceFlow",
            "properties": {},
            "sourceNodeId": "serviceTask_custom_c631f902b508464fb2b3a6cbd4471deb",
            "targetNodeId": "endEvent_a9e6e0f474c94b2f8700fd5c83b8fc2f",
            "sourceAnchorId": "serviceTask_custom_c631f902b508464fb2b3a6cbd4471deb_2",
            "targetAnchorId": "endEvent_a9e6e0f474c94b2f8700fd5c83b8fc2f_0",
            "startPoint": {
              "x": 470,
              "y": 457
            },
            "endPoint": {
              "x": 470,
              "y": 548
            },
            "pointsList": [
              {
                "x": 470,
                "y": 457
              },
              {
                "x": 470,
                "y": 548
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
