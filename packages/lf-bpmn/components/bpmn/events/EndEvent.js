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
import {bpmnConst, bpmnNodeType} from '../../constants/bpmn-constant'
import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class EndEventModel extends RectNodeModel {
    setAttributes() {
    }

    getNodeStyle() {
        const style = super.getNodeStyle()
        style.stroke = '#2D8CF0'
        style.fill = '#2D8CF0'
        style.fillOpacity = 0.05
        style.radius = 10
        return style
    }

    getTextStyle() {
        const style = super.getTextStyle()
        style.fontSize = 14
        style.color = '#606266'
        style.dy = 44
        return style
    }

    initNodeData(data) {
        super.initNodeData(data)
        this.width = 40
        this.height = 40
    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class EndEventView extends RectNode {
    // 重写父类的方法
    getLabelShape() {
        const {model} = this.props
        const {x, y, width, height} = model
        this.props.model.id =
            this.props.model.id.indexOf(bpmnConst.END_EVENT_PRE) === -1
                ? bpmnConst.END_EVENT_PRE + this.props.model.id
                : this.props.model.id

        let stroke = '#ED4014'

        return h(
            'svg', {
                x: x - width / 2,
                y: y - height / 2,
                width: 40,
                height: 40,
                viewBox: '0 0 24 24'
            },
            [
                h(
                    'g', {
                        transform: 'translate(-583.000000, -142.000000)',
                        fill: stroke
                    },
                    [
                        h(
                            'g', {
                                transform: 'translate(583.000000, 142.000000)',
                                fill: stroke
                            },
                            [
                                h('circle', {
                                    stroke: stroke,
                                    fillOpacity: '0.05',
                                    cx: '12',
                                    cy: '12',
                                    r: '11.5'
                                }),
                                h('path', {
                                    fillRule: 'nonzero',
                                    d: 'M15.9353055,14.9729419 C15.9353055,15.3923555 15.5921489,15.7355121 15.1727353,15.7355121 L8.7625702,15.7355121 C8.34141431,15.7355121 8,15.3940978 8,14.9729419 L8,8.7625702 C8,8.34141431 8.34141431,8 8.7625702,8 L15.1727353,8 C15.5921489,8 15.9353055,8.34315659 15.9353055,8.7625702 L15.9353055,14.9729419 L15.9353055,14.9729419 Z'
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

        return h('g', {}, [
            h('rect', {
                x: x - width / 2,
                y: y - height / 2,
                width,
                height,
                fillOpacity: 0.0,
                strokeOpacity: 0.0
            }),

            this.getLabelShape()
        ])
    }
}

// 导出自定义节点
export default {
    name: '结束事件', // 必填：拖拽面板上的组件展示名称
    icon: 'end-event', // 必填：拖拽面板上的组件图标，和 assets/icons/svgs 文件名保持一致
    type: bpmnNodeType.endEvent, // 节点类型
    view: EndEventView,
    model: EndEventModel
}
