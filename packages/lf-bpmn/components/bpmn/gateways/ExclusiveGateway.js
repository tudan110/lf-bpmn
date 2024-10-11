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
        this.props.model.id =
            this.props.model.id.indexOf('exclusiveGateway_') === -1
                ? 'exclusiveGateway_' + this.props.model.id
                : this.props.model.id
        const style = model.getNodeStyle()

        let stroke = '#2D8CF0'

        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
        return h(
            'svg',
            {
                x: x - width / 2 - 2,
                y: y - height / 2 - 2,
                width: 64,
                height: 64,
                viewBox: '0 0 26 24'
            },
            [
                // svg dom <path fill="#2D8CF0" d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448-200.96 448-448 448z m0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384z"></path>
                h('title', {
                    innerText: '排他网关'
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
                                transform: 'translate(-487.000000, -200.000000)',
                                fill: stroke
                            },
                            [
                                h(
                                    'g',
                                    {
                                        id: '编组-48',
                                        transform: 'translate(487.000000, 200.000000)',
                                        fill: stroke
                                    },
                                    [
                                        h('path', {
                                            id: '多边形',
                                            stroke: stroke,
                                            fillOpacity: '0.05',
                                            d: 'M13,0.618033989 L24.7759495,9.17376208 L20.277937,23.0172209 L5.72206298,23.0172209 L1.22405054,9.17376208 L13,0.618033989 Z'
                                        }),
                                        h('path', {
                                            id: '形状',
                                            d: 'M17.4612855,15.5211579 C18.3333436,15.7490081 18.9009139,16.5885782 18.7873565,17.4827291 C18.6737991,18.37688 17.9143807,19.0479222 17.0130516,19.0505527 C16.1095027,19.0514448 15.3464671,18.3798555 15.2326304,17.4835059 C15.1187938,16.5871563 15.6897297,15.7461522 16.5648177,15.5211579 L16.5648177,13.6717447 C16.5648177,13.4241919 16.3641365,13.2235107 16.1165837,13.2235107 L9.84130871,13.2235107 C9.59375594,13.2235107 9.39307477,13.4241919 9.39307477,13.6717447 L9.39307477,15.5211579 C10.2651329,15.7490081 10.8327032,16.5885782 10.7191458,17.4827291 C10.6055884,18.37688 9.84616998,19.0479222 8.94484084,19.0505527 C8.04129195,19.0514448 7.27825631,18.3798555 7.16441968,17.4835059 C7.05058305,16.5871563 7.62151894,15.7461522 8.49660691,15.5211579 L8.49660691,13.2235107 C8.49660691,12.7284052 8.89796925,12.3270429 9.39307477,12.3270429 L12.5307123,12.3270429 L12.5307123,10.0293957 C11.6586542,9.80154546 11.0910839,8.9619754 11.2046413,8.0678245 C11.3181987,7.17367359 12.0776171,6.50263143 12.9789462,6.50000089 C13.8824951,6.49910876 14.6455308,7.17069812 14.7593674,8.06704773 C14.873204,8.96339734 14.3022681,9.80440143 13.4271801,10.0293957 L13.4271801,12.3270429 L16.5648177,12.3270429 C17.0599232,12.3270429 17.4612855,12.7284052 17.4612855,13.2235107 L17.4612855,15.5211579 Z M12.9789462,9.18940536 C13.4740517,9.18940536 13.8754141,8.78804303 13.8754141,8.2929375 C13.8754141,7.79783197 13.4740517,7.39646964 12.9789462,7.39646964 C12.4838407,7.39646964 12.0824784,7.79783197 12.0824784,8.2929375 C12.0824784,8.78804303 12.4838407,9.18940536 12.9789462,9.18940536 Z M8.94484084,18.154084 C9.43994637,18.154084 9.84130871,17.7527216 9.84130871,17.2576161 C9.84130871,16.7625106 9.43994637,16.3611482 8.94484084,16.3611482 C8.44973532,16.3611482 8.04837298,16.7625106 8.04837298,17.2576161 C8.04837298,17.7527216 8.44973532,18.154084 8.94484084,18.154084 Z M17.0130516,18.154084 C17.5081571,18.154084 17.9095194,17.7527216 17.9095194,17.2576161 C17.9095194,16.7625106 17.5081571,16.3611482 17.0130516,16.3611482 C16.5179461,16.3611482 16.1165837,16.7625106 16.1165837,17.2576161 C16.1165837,17.7527216 16.5179461,18.154084 17.0130516,18.154084 Z',
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
    type: 'bpmn:exclusiveGateway', // 节点类型
    view: UserTaskView,
    model: UserTaskModel
}
