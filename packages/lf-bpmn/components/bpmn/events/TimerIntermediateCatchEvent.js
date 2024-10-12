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
        this.width = 40
        this.height = 40
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
                width: 40,
                height: 40,
                viewBox: '0 0 1024 1024'
            },
            [
                h('path', {
                    fill: '#909399',
                    d: 'm512,0a512,512 0 1 0 512,512a512,512 0 0 0 -512,-512zm0,1004.2368a492.2368,492.2368 0 1 1 492.2368,-492.2368a492.2368,492.2368 0 0 1 -492.2368,492.2368z'
                }),
                h('path', {
                    fill: '#FFFFFF',
                    d: 'm512,512m-492.2368,0a492.2368,492.2368 0 1 0 984.4736,0a492.2368,492.2368 0 1 0 -984.4736,0z'
                }),
                h('path', {
                    fill: '#909399',
                    d: 'm512,58.9824a453.0176,453.0176 0 1 0 453.0176,453.0176a453.0176,453.0176 0 0 0 -453.0176,-453.0176zm0,888.5248a435.5072,435.5072 0 1 1 435.5072,-435.5072a435.5072,435.5072 0 0 1 -435.5072,435.5072z'
                }),
                h('path', {
                    fill: '#606266',
                    d: 'm518.2464,156.0064a362.2912,362.2912 0 1 0 362.2912,362.2912a362.1376,362.1376 0 0 0 -362.2912,-362.2912zm22.1696,679.7824l0,-65.8944a22.1184,22.1184 0 0 0 -44.288,0l0,65.8944a319.0784,319.0784 0 0 1 -295.8848,-295.8848l65.8944,0a22.1696,22.1696 0 0 0 0,-44.288l-65.3824,0a318.464,318.464 0 0 1 295.3728,-294.8096l0,65.8432a22.1184,22.1184 0 0 0 44.288,0l0,-65.8432a319.0784,319.0784 0 0 1 295.8848,295.8848l-65.8944,0a22.1184,22.1184 0 1 0 0,44.2368l65.8944,0a318.5664,318.5664 0 0 1 -295.8848,294.8608z'
                }),
                h('path', {
                    transform: 'rotate(25.5514 578.592 484.93)',
                    fill: '#606266',
                    d: 'm663.448,526.1792l-72.5504,0a63.5904,63.5904 0 0 0 -35.84,-35.84l0,-109.6192a22.1696,22.1696 0 0 0 -44.288,0l0,110.08a61.8496,61.8496 0 1 0 80.2816,79.7696l72.5504,0a22.272,22.272 0 0 0 22.1184,-22.1184a22.6304,22.6304 0 0 0 -22.272,-22.272z'
                })
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
