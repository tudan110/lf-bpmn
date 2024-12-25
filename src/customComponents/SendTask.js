/**
 * 自定义节点
 *
 * LogicFlow内部存在7种基础节点, 自定义节点的时候可以基于需要选择任一一种来继承, 然后取一个符合自己业务意义的名字。
 * 7种基础节点分别是：
 * 1、矩形节点：RectNode      import { RectNode, RectNodeModel } from "@logicflow/core"
 * 2、圆形节点：CircleNode    import { CircleNode, CircleNodeModel } from "@logicflow/core"
 * 3、菱形节点：DiamondNode   import { DiamondNode, DiamondNodeModel } from "@logicflow/core"
 * 4、椭圆节点：EllipseNode   import { EllipseNode, EllipseNodeModel } from "@logicflow/core"
 * 5、多边形节点：PolygonNode import { PolygonNode, PolygonNodeModel } from "@logicflow/core"
 * 6、文本节点：TextNode      import { TextNode, TextNodeModel } from "@logicflow/core"
 * 7、HTML节点：HtmlNode      import { HtmlNode, HtmlNodeModel } from "@logicflow/core"
 */

import {bpmnConst, bpmnNodeType} from '@/constants/bpmn-constant'
import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class SendTaskModel extends RectNodeModel {
    setAttributes() {
        /*let flowState = store.state.logicFlow.currentFlowCatalog.flowState
        if (flowState !== 0) {
          this.menu = []
        }*/
    }

    getNodeStyle() {
        const style = super.getNodeStyle()
        style.stroke = '#2D8CF0'
        style.fill = '#2D8CF0'
        style.fillOpacity = 0.05
        style.radius = 10
        return style
    }

    getTextStyle(data) {
        const style = super.getTextStyle(data)
        style.fontSize = 14
        style.color = '#606266'
        style.dy = 54
        return style
    }

    initNodeData(data) {
        super.initNodeData(data)
        this.width = 120
        this.height = 80
        // this.x = this.x + 44.5
        // this.y = this.y + 44


    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class SendTaskView extends RectNode {
    // 重写父类的方法
    getLabelShape() {
        const {model} = this.props
        const {x, y, width, height} = model
        const style = model.getNodeStyle()
        this.props.model.id =
            this.props.model.id.indexOf(bpmnConst.SEND_TASK_PRE) === -1
                ? bpmnConst.SEND_TASK_PRE + this.props.model.id
                : this.props.model.id

        let stroke = '#1890FF'

        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
        return h(
            'svg',
            {
                x: x - width / 2,
                y: y - height / 2,
                width: 120,
                height: 80,
                viewBox: '0 0 2060 1460'
            },
            [
                h(
                    'g',
                    {
                        fill: stroke
                    },
                    [
                        h('rect', {
                            height: '1400',
                            width: '2000',
                            y: '30',
                            x: '30',
                            ry: '300',
                            rx: '300',
                            fillOpacity: '0.05',
                            strokeWidth: '60',
                            strokeLinecap: 'round',
                            stroke: '#2d8cf0'
                        }),
                        h(
                            'g',
                            {
                                stroke: stroke,
                                strokeLinecap: 'round',
                            },
                            [
                                h('path', {
                                    fill: stroke,
                                    strokeWidth: '0.62335',
                                    d: 'm210,209.99999l704.21997,0l-352.11034,199.32355l-352.10963,-199.32355z',
                                }),
                                h('path', {
                                    fill: stroke,
                                    strokeWidth: '0.62335',
                                    d: 'm210.87759,283.75816l351.23205,196.69009l352.98863,-196.68938l0,393.37806l-704.22068,0l0,-393.37877z',
                                })
                            ]
                        )
                    ]
                )
            ]
        )

    }

    /**
     * 完全自定义节点外观方法
     */
    getShape() {

        const {model, graphModel} = this.props
        const {x, y, width, height, radius} = model

        // this.x = this.x + 44.5
        // this.y = this.y + 44
        return h('g', {}, [
            h('rect', {
                x: x - width / 2,
                y: y - height / 2,
                width,
                height,
                fillOpacity: 0.0,
                strokeOpacity: 0.0,
            }),
            this.getLabelShape(),
        ])
    }
}

// 导出自定义节点
export default {
    name: '发送任务', // 必填：拖拽面板上的组件展示名称
    icon: 'send-task', // 必填：拖拽面板上的组件图标，和 assets/icons/svgs 文件名保持一致
    type: bpmnNodeType.sendTask, // 节点类型
    view: SendTaskView,
    model: SendTaskModel,
}
