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
import {bpmnConst} from '../../constants/bpmn-constant'
import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class UserTaskModel extends RectNodeModel {
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
        this.width = 60
        this.height = 60
    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class UserTaskView extends RectNode {
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
            'svg',
            {
                x: x - width / 2,
                y: y - height / 2,
                width: 60,
                height: 60,
                viewBox: '0 0 24 24'
            },
            [
                // svg dom <path fill="#2D8CF0" d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448-200.96 448-448 448z m0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384z"></path>
                h('title', {
                    innerText: '结束节点'
                }),
                // svg dom <path fill="#2D8CF0" fill-opacity="0.05" d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"></path>
                h(
                    'g',
                    {
                        id: '网管',
                        stroke: 'none',
                        strokeWidth: '1',
                        fill: 'none',
                        fillRule: 'evenodd'
                    },
                    [
                        h(
                            'g',
                            {
                                id: '流程管理',
                                transform: 'translate(-583.000000, -142.000000)',
                                fill: stroke
                            },
                            [
                                h(
                                    'g',
                                    {
                                        id: '编组-48',
                                        transform: 'translate(583.000000, 142.000000)',
                                        fill: stroke
                                    },
                                    [
                                        h('circle', {
                                            id: '椭圆形',
                                            stroke: stroke,
                                            fillOpacity: '0.05',
                                            cx: '12',
                                            cy: '12',
                                            r: '11.5'
                                        }),
                                        h('path', {
                                            id: '路径',
                                            d: 'M15.9353055,14.9729419 C15.9353055,15.3923555 15.5921489,15.7355121 15.1727353,15.7355121 L8.7625702,15.7355121 C8.34141431,15.7355121 8,15.3940978 8,14.9729419 L8,8.7625702 C8,8.34141431 8.34141431,8 8.7625702,8 L15.1727353,8 C15.5921489,8 15.9353055,8.34315659 15.9353055,8.7625702 L15.9353055,14.9729419 L15.9353055,14.9729419 Z',
                                            fillRule: 'nonzero'
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
    type: 'bpmn:endEvent', // 节点类型
    view: UserTaskView,
    model: UserTaskModel
}
