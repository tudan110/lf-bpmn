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
                                    strokeWidth: '39.2105',
                                    d: 'm333.67713,218.81077l264.6292,0c-36.77482,22.93073 -62.45762,44.00981 -79.41408,63.81649c-18.95978,22.14766 -27.11031,42.91928 -27.34708,62.45007c-0.47355,39.06226 29.73061,71.18326 59.76937,101.94676c30.03876,30.76418 59.98487,60.47146 63.30177,92.05508c1.65879,15.79181 -2.88521,32.40238 -17.83768,51.26197c-14.82138,18.6935 -40.01279,39.34776 -78.98034,62.168l-264.46654,0c32.54445,-20.20679 54.69897,-38.89549 68.81072,-56.69405c16.00457,-20.18689 21.60411,-39.49669 19.69687,-57.65625c-3.81515,-36.32048 -35.83733,-66.64337 -65.76147,-97.2902c-29.92415,-30.64614 -57.67889,-61.31835 -57.26162,-95.68425c0.20795,-17.18295 7.21509,-35.78517 25.22847,-56.82651c17.86925,-20.87319 46.61708,-43.95971 89.63244,-69.54712zm-2.44667,-8.81075l-1.03769,0.6163c-44.11619,26.14262 -73.87974,49.86328 -92.84021,72.01094c-18.96047,22.14766 -27.11031,42.91928 -27.34708,62.45007c-0.47355,39.06226 29.72855,71.18326 59.76731,101.94676c30.03945,30.76418 59.98624,60.47146 63.30451,92.05508c1.65811,15.79181 -2.8859,32.40238 -17.83837,51.26197c-14.95247,18.85958 -40.41634,39.70738 -79.97685,62.76851l-14.08498,8.21023l299.03353,0l1.02945,-0.59914c40.13015,-23.3933 66.43748,-44.71945 82.44274,-64.90566c16.00457,-20.18689 21.60342,-39.49669 19.69619,-57.65625c-3.81515,-36.32048 -35.83733,-66.64337 -65.76147,-97.2902c-29.92346,-30.64614 -57.67821,-61.31835 -57.26162,-95.68425c0.20864,-17.18295 7.21509,-35.78517 25.22847,-56.82651c18.01406,-21.04202 47.0419,-44.3262 90.63993,-70.16136l13.82968,-8.19651l-298.82352,0z',
                                }),
                                h('path', {
                                    fill: stroke,
                                    strokeWidth: '11.203',
                                    d: 'm388.01168,563.64056l0,8.81075l168.376,0l0,-8.81075l-168.376,0zm-24.29441,-88.86927l0,8.81006l162.22399,0l0,-8.81075l-162.22399,0.00069zm-79.49781,-88.86927l0,8.81075l167.75902,0l0,-8.81006l-167.75902,-0.00069zm6.30506,-88.86927l0,8.81006l161.9982,0l0,-8.81075l-161.9982,0.00069z',
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
    type: bpmnNodeType.scriptTask, // 节点类型
    view: ScriptTaskView,
    model: ScriptTaskModel,
}
