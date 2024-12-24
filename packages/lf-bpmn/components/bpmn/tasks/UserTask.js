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
import {bpmnNodeType} from '../../constants/bpmn-constant'

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
        style.dy = 54
        return style
    }

    initNodeData(data) {
        super.initNodeData(data)
        this.width = 120
        this.height = 80
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
            this.props.model.id.indexOf('userTask_') === -1
                ? 'userTask_' + this.props.model.id
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
                    'g', {
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
                            strokeWidth: '60',
                            stroke: stroke,
                            strokeLinecap: 'round',
                            fillOpacity: '0.05',
                        }),
                        h('path', {
                            fill: stroke,
                            d: 'm446.48991,210.00001c-72.43921,0 -124.26086,55.6874 -124.40596,119.1191l0,0.03556c0.00427,19.18293 5.19511,39.42779 13.305,57.68891c5.85588,13.1848 13.13572,25.30625 22.00667,35.01649c-52.72354,18.03779 -114.49229,47.72545 -145.71274,106.26362l-1.68286,3.15519l0,189.49847l472.97979,0l0,-189.49847l-1.68215,-3.15448c-30.77164,-57.69745 -91.20392,-87.34315 -143.41819,-105.45562c25.48904,-25.92007 33.00858,-59.37533 33.01712,-93.51412l0,-0.03556c-0.14581,-63.4317 -51.96675,-119.1191 -124.40667,-119.1191zm-49.45953,67.54497c3.34794,0.00854 7.02449,0.1202 11.07731,0.35919c32.2902,1.90336 43.15839,7.71585 51.51154,13.22818c8.35386,5.51234 14.24317,10.76008 36.31954,11.40378l0.01423,0c17.20347,-0.6437 25.47766,-3.71069 31.40965,-7.18524c2.40409,-1.40831 4.42409,-2.87139 6.49247,-4.26904c5.46753,11.72029 8.40365,24.67677 8.43708,38.08491c-0.01138,38.18164 -6.57568,64.92038 -41.58435,86.80116l3.42476,25.81196a586.80065,586.80065 0 0 1 22.46402,7.30402c1.0669,4.45397 2.30096,10.29562 3.1303,16.50571c0.86917,6.50669 1.21129,13.27584 0.67571,18.35857c-0.5363,5.08273 -2.1146,7.82681 -2.39129,8.1042c-17.79453,17.79382 -49.38058,28.17124 -81.41899,28.17124c-32.0377,0 -63.62445,-10.37742 -81.41899,-28.17124c-0.27668,-0.27739 -1.85499,-3.02147 -2.39058,-8.1042c-0.53559,-5.08273 -0.19418,-11.85188 0.67571,-18.35786c0.83361,-6.24494 2.07691,-12.12145 3.14879,-16.58395a587.6058,587.6058 0 0 1 22.24139,-7.2265l2.04134,-27.6577c-1.66224,-2.13239 -3.35577,-3.54425 -5.3772,-5.06068c-7.814,-5.86228 -17.28882,-18.75759 -23.98186,-33.82796c-6.69091,-15.06468 -10.83619,-32.28451 -10.84259,-46.06962c0.04196,-16.52634 4.48953,-32.36773 12.65775,-46.05041c1.46166,-0.54412 3.00298,-1.11954 4.73492,-1.68926c6.09202,-2.00365 14.43948,-3.91554 28.94937,-3.87926zm-61.84486,183.69878c-0.02489,0.18706 -0.05406,0.36986 -0.07895,0.55835c-1.05695,7.91216 -1.6786,16.52492 -0.76959,25.1455c0.909,8.62058 3.18364,17.90193 10.61143,25.32972c25.3539,25.3539 63.72474,36.54999 101.64393,36.54999c37.91847,0 76.29002,-11.19538 101.64393,-36.54999c7.42778,-7.42778 9.70242,-16.70914 10.61143,-25.32972c0.90829,-8.62058 0.28735,-17.23334 -0.76959,-25.1455c-0.02134,-0.15648 -0.04481,-0.30727 -0.06615,-0.46232c38.54652,16.90331 75.80565,41.11278 96.36417,77.25877l0,153.57511l-68.44401,0l0,-108.28362l-28.60369,0l0,108.28362l-222.29012,0l0,-108.28362l-28.60298,0l0,108.28362l-67.83161,0l0,-153.5744c20.59836,-36.21427 57.95848,-60.44721 96.58253,-77.3555l-0.00071,0z',
                        })
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
    type: bpmnNodeType.userTask, // 节点类型
    view: UserTaskView,
    model: UserTaskModel
}
