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
import {bpmnConst, bpmnNodeType} from '../../constants/bpmn-constant'

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class ScriptTaskModel extends RectNodeModel {
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
        style.dy = 44
        return style
    }

    initNodeData(data) {
        super.initNodeData(data)
        this.width = 75
        this.height = 48
        // this.x = this.x + 44.5
        // this.y = this.y + 44


    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class ScriptTaskView extends RectNode {
    // 重写父类的方法
    getLabelShape() {
        const {model} = this.props
        const {x, y, width, height} = model
        const style = model.getNodeStyle()
        this.props.model.id =
            this.props.model.id.indexOf(bpmnConst.SCRIPT_TASK_PRE) === -1
                ? bpmnConst.SCRIPT_TASK_PRE + this.props.model.id
                : this.props.model.id

        let stroke = '#1890FF'

        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
        return h(
            'svg',
            {
                x: x - width / 2,
                y: y - height / 2,
                width: 75,
                height: 75,
                viewBox: '0 0 32 31',
            },
            [
                h(
                    'g', {
                        transform: 'translate(-579.000000, -260.000000)',
                        fill: stroke,
                    },
                    [
                        h(
                            'g', {
                                transform: 'translate(579.000000, 260.000000)',
                            },
                            [
                                h('rect', {
                                    stroke: stroke,
                                    fillOpacity: '0.05',
                                    x: '0.5',
                                    y: '0.5',
                                    width: '31',
                                    height: '19.2105263',
                                    rx: '4',
                                }),
                                h('path', {
                                    d: 'M20.5454546,5 C20.7964931,5 21,5.20350693 21,5.45454545 L21,14.5454546 C21,14.7964931 20.7964931,15 20.5454546,15 L11.4545454,15 C11.2035069,15 11,14.7964931 11,14.5454546 L11,5.45454545 C11,5.20350693 11.2035069,5 11.4545454,5 L20.5454546,5 L20.5454546,5 Z M20.0909091,8.18181818 L11.9090909,8.18181818 L11.9090909,14.0909091 L20.0909091,14.0909091 L20.0909091,8.18181818 Z M14.6245455,9.31363636 C14.7100769,9.22199772 14.8536554,9.21691349 14.9454545,9.30227273 L15.2781818,9.61227272 C15.3222672,9.65342819 15.3481868,9.71041861 15.350233,9.77069384 C15.3522791,9.83096907 15.3302838,9.88958602 15.2890909,9.93363637 L14.1831818,11.1190909 L15.2890909,12.3054545 C15.3745695,12.3971306 15.3696888,12.5407041 15.2781818,12.6263636 L14.9454545,12.9363636 C14.8537784,13.0218422 14.710205,13.0169616 14.6245455,12.9254546 L13.2395454,11.4404546 L13.0854545,11.2968182 C13.0365528,11.2512038 13.0102723,11.1863342 13.0136364,11.1195455 L13.015,11.0809091 C13.0212726,11.0276651 13.0462395,10.9783757 13.0854545,10.9418182 L13.2390909,10.7981818 L14.6245455,9.31363636 Z M17.3754545,9.31363636 L18.7604546,10.7981818 L18.9145455,10.9418182 C18.9554546,10.98 18.9786364,11.0295455 18.985,11.0809091 L18.9863636,11.1190909 C18.9898641,11.1860354 18.9635722,11.2510995 18.9145455,11.2968182 L18.76,11.4404546 L17.3754545,12.9254546 C17.3006195,13.0056318 17.1792013,13.0209286 17.0868182,12.9618182 L17.0545455,12.9363636 L16.7218182,12.6263636 C16.6303112,12.5407041 16.6254305,12.3971306 16.7109091,12.3054545 L17.8163636,11.1190909 L16.7109091,9.93363637 C16.6697162,9.88958602 16.6477209,9.83096907 16.649767,9.77069384 C16.6518132,9.71041861 16.6777328,9.65342819 16.7218182,9.61227272 L17.0545455,9.30227273 C17.1463446,9.21691349 17.2899231,9.22199772 17.3754545,9.31363636 L17.3754545,9.31363636 Z M20.0909091,5.90909091 L11.9090909,5.90909091 L11.9090909,7.27272727 L20.0909091,7.27272727 L20.0909091,5.90909091 Z',
                                    fillRule: 'nonzero',
                                }),
                            ]
                        ),
                    ]
                ),
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
    type: bpmnNodeType.scriptTask, // 节点类型
    view: ScriptTaskView,
    model: ScriptTaskModel,
}
