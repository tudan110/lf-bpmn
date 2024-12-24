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
                        fill: '#1890FF'
                    },
                    [
                        h('rect', {
                            strokeWidth: '60',
                            stroke: '#2d8cf0',
                            strokeLinecap: 'round',
                            fillOpacity: '0.05',
                            ry: '300',
                            rx: '300',
                            y: '30',
                            x: '30',
                            height: '1400',
                            width: '2000'
                        }),
                        h('path', {
                            fill: stroke,
                            d: 'm542.49001,210.00001c-101.845,0 -174.703,78.293 -174.907,167.474l0,0.05c0.006,26.97 7.304,55.433 18.706,81.107c8.233,18.537 18.468,35.579 30.94,49.231c-74.126,25.36 -160.969,67.099 -204.863,149.4l-2.366,4.436l0,266.423l664.98,0l0,-266.423l-2.365,-4.435c-43.263,-81.119 -128.227,-122.799 -201.637,-148.264c35.836,-36.442 46.408,-83.478 46.42,-131.475l0,-0.05c-0.205,-89.181 -73.062,-167.474 -174.908,-167.474zm-69.537,94.964c4.707,0.012 9.876,0.169 15.574,0.505c45.398,2.676 60.678,10.848 72.422,18.598c11.745,7.75 20.025,15.128 51.063,16.033l0.02,0c24.187,-0.905 35.82,-5.217 44.16,-10.102c3.38,-1.98 6.22,-4.037 9.128,-6.002c7.687,16.478 11.815,34.694 11.862,53.545c-0.016,53.681 -9.245,91.274 -58.465,122.037l4.815,36.29a825.005,825.005 0 0 1 31.583,10.269c1.5,6.262 3.235,14.475 4.401,23.206c1.222,9.148 1.703,18.665 0.95,25.811c-0.754,7.146 -2.973,11.004 -3.362,11.394c-25.018,25.017 -69.426,39.607 -114.47,39.607c-45.043,0 -89.452,-14.59 -114.47,-39.607c-0.389,-0.39 -2.608,-4.248 -3.361,-11.394c-0.753,-7.146 -0.273,-16.663 0.95,-25.81c1.172,-8.78 2.92,-17.042 4.427,-23.316a826.137,826.137 0 0 1 31.27,-10.16l2.87,-38.885c-2.337,-2.998 -4.718,-4.983 -7.56,-7.115c-10.986,-8.242 -24.307,-26.372 -33.717,-47.56c-9.407,-21.18 -15.235,-45.39 -15.244,-64.771c0.059,-23.235 6.312,-45.507 17.796,-64.744c2.055,-0.765 4.222,-1.574 6.657,-2.375c8.565,-2.817 20.301,-5.505 40.701,-5.454zm-86.95,258.269c-0.035,0.263 -0.076,0.52 -0.111,0.785c-1.486,11.124 -2.36,23.233 -1.082,35.353c1.278,12.12 4.476,25.169 14.919,35.612c35.646,35.646 89.593,51.387 142.905,51.387c53.311,0 107.259,-15.74 142.905,-51.387c10.443,-10.443 13.641,-23.492 14.919,-35.612c1.277,-12.12 0.404,-24.229 -1.082,-35.353c-0.03,-0.22 -0.063,-0.432 -0.093,-0.65c54.194,23.765 106.578,57.802 135.482,108.621l0,215.917l-96.228,0l0,-152.24l-40.215,0l0,152.24l-312.526,0l0,-152.24l-40.214,0l0,152.24l-95.367,0l0,-215.916c28.96,-50.915 81.486,-84.985 135.789,-108.757l-0.001,0z',
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
