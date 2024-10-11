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

import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class UserTaskModel extends RectNodeModel {
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
        style.dy = 45
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
        const style = model.getNodeStyle()
        this.props.model.id =
            this.props.model.id.indexOf('intermediateCatchEvent_') === -1
                ? 'intermediateCatchEvent_' + this.props.model.id
                : this.props.model.id

        let stroke = '#2D8CF0'
        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
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
                    innerText: '定时器'
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
                                transform: 'translate(-583.000000, -200.000000)',
                                fill: stroke
                            },
                            [
                                h(
                                    'g',
                                    {
                                        id: '编组-49',
                                        transform: 'translate(583.000000, 200.000000)',
                                        fill: stroke
                                    },
                                    [
                                        h('rect', {
                                            id: '矩形',
                                            stroke: stroke,
                                            fillOpacity: '0.05',
                                            x: '0.5',
                                            y: '0.5',
                                            width: '23',
                                            height: '23'
                                        }),
                                        h('path', {
                                            id: '形状结合',
                                            d: 'M15.7338867,5.33333333 C16.0465495,5.33333333 16.3011068,5.58927409 16.3011068,5.90055339 C16.3011068,6.21321615 16.045166,6.46777344 15.7338867,6.46777344 L12.9005534,6.46777344 L12.9005534,7.62988281 C15.7629395,7.91349284 18,10.3290202 18,13.2674967 C18,16.3968913 15.4627279,18.9341634 12.3333333,18.9341634 C9.2039388,18.9341634 6.66666667,16.3968913 6.66666667,13.2674967 C6.66666667,10.3290202 8.90234375,7.9148763 11.7661133,7.62988281 L11.7661133,6.46777344 L8.93277995,6.46777344 C8.62011719,6.46777344 8.3655599,6.21183268 8.3655599,5.90055339 C8.3655599,5.58789062 8.62150065,5.33333333 8.93277995,5.33333333 Z M12.3333333,8.73388672 C9.83341471,8.73388672 7.79972331,10.7675781 7.79972331,13.2674967 C7.79972331,15.7674154 9.83341471,17.8011068 12.3333333,17.8011068 C14.833252,17.8011068 16.8669434,15.7674154 16.8669434,13.2674967 C16.8669434,10.7675781 14.833252,8.73388672 12.3333333,8.73388672 Z M12.0497233,9.58333333 C12.3623861,9.58333333 12.6169434,9.83927409 12.6169434,10.1505534 L12.6169434,12.7500814 L14.8540039,14.9871419 C15.0739746,15.2071126 15.0739746,15.5681966 14.8540039,15.7881673 C14.6340332,16.008138 14.2729492,16.008138 14.0529785,15.7881673 L11.6485189,13.3837077 C11.6000977,13.3366699 11.5655111,13.2813314 11.5378418,13.2232259 C11.5336914,13.2163086 11.529541,13.2093913 11.5267741,13.202474 C11.5170898,13.1789551 11.511556,13.1540527 11.5046387,13.1305339 C11.5004883,13.1180827 11.4963379,13.107015 11.493571,13.0945638 C11.4880371,13.0613607 11.4838867,13.0267741 11.4838867,12.993571 L11.4825033,12.9838867 L11.4825033,10.1505534 C11.4825033,9.83789062 11.7370605,9.58333333 12.0497233,9.58333333 Z',
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
    type: 'bpmn:intermediateCatchEvent', // 节点类型
    view: UserTaskView,
    model: UserTaskModel
}
