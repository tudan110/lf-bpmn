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

import {h, RectNode, RectNodeModel} from '@logicflow/core'
import {bpmnNodeType} from '../../constants/bpmn-constant' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class ExclusiveGatewayModel extends RectNodeModel {
    setAttributes() {
    }

    getNodeStyle() {
        const style = super.getNodeStyle()
        style.stroke = '#19BE6B'
        style.fill = '#19BE6B'
        style.fillOpacity = 0.05
        style.radius = 10
        return style
    }

    getTextStyle() {
        const style = super.getTextStyle()
        style.fontSize = 14
        style.color = '#606266'
        style.dy = 45
        return style
    }

    initNodeData(data) {
        super.initNodeData(data)
        this.width = 48
        this.height = 48
    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class ExclusiveGatewayView extends RectNode {
    // 重写父类的方法
    getLabelShape() {

        const {model} = this.props
        const {x, y, width, height} = model
        this.props.model.id =
            this.props.model.id.indexOf('exclusiveGateway_') === -1
                ? 'exclusiveGateway_' + this.props.model.id
                : this.props.model.id
        const style = model.getNodeStyle()

        let stroke = '#FF9900'

        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
        return h(
            'svg', {
                x: x - width / 2 - 2,
                y: y - height / 2 - 2,
                width: 52,
                height: 52,
                viewBox: '0 0 26 26'
            },
            [
                h(
                    'g', {
                        transform: 'translate(-487.000000, -260.000000)',
                        fill: stroke
                    },
                    [
                        h(
                            'g', {
                                transform: 'translate(487.000000, 260.000000)'
                            },
                            [
                                h('path', {
                                    stroke: stroke,
                                    fillOpacity: '0.05',
                                    transform: 'translate(13.000000, 13.000000) rotate(45.000000) translate(-13.000000, -13.000000)',
                                    d: 'M20.1923882,4.30761184 C20.6066017,4.30761184 20.9816017,4.47550506 21.2530483,4.74695167 C21.5244949,5.01839828 21.6923882,5.39339828 21.6923882,5.80761184 L21.6923882,20.1923882 C21.6923882,20.6066017 21.5244949,20.9816017 21.2530483,21.2530483 C20.9816017,21.5244949 20.6066017,21.6923882 20.1923882,21.6923882 L5.80761184,21.6923882 C5.39339828,21.6923882 5.01839828,21.5244949 4.74695167,21.2530483 C4.47550506,20.9816017 4.30761184,20.6066017 4.30761184,20.1923882 L4.30761184,5.80761184 C4.30761184,5.39339828 4.47550506,5.01839828 4.74695167,4.74695167 C5.01839828,4.47550506 5.39339828,4.30761184 5.80761184,4.30761184 Z'
                                }),
                                h(
                                    'g', {
                                        transform: 'translate(6.361053, 6.361053) rotate(45 6.64 6.64)'
                                    },
                                    [
                                        h('rect', {
                                            x: '0',
                                            y: '6.12825877',
                                            width: '13.277894',
                                            height: '1.02137646',
                                            rx: '0.510688231'
                                        }),
                                        h('path', {
                                            transform: 'translate(6.638947, 6.638947) scale(1, -1) rotate(90.000000) translate(-6.638947, -6.638947)',
                                            d: 'M0.510688231,6.12825877 L12.7672058,6.12825877 C13.0492511,6.12825877 13.277894,6.35690168 13.277894,6.638947 C13.277894,6.92099232 13.0492511,7.14963523 12.7672058,7.14963523 L0.510688231,7.14963523 C0.228642909,7.14963523 -1.81895486e-12,6.92099232 -1.8189894e-12,6.638947 C-1.81902394e-12,6.35690168 0.228642909,6.12825877 0.510688231,6.12825877 Z'
                                        })
                                    ]
                                )
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
    name: '排他网关', // 必填：拖拽面板上的组件展示名称
    icon: 'exclusive-gateway', // 必填：拖拽面板上的组件图标，和 assets/icons/svgs 文件名保持一致
    type: bpmnNodeType.exclusiveGateway, // 节点类型
    view: ExclusiveGatewayView,
    model: ExclusiveGatewayModel
}
