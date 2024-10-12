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
                viewBox: '0 0 32 20'
            },
            [
                h('g', {
                        transform: 'translate(-579.000000, -260.000000)',
                        fill: stroke
                    },
                    [
                        h(
                            'g', {
                                transform: 'translate(579.000000, 260.000000)'
                            },
                            [
                                h('rect', {
                                    stroke: stroke,
                                    fillOpacity: '0.05',
                                    x: '0.5',
                                    y: '0.5',
                                    width: '31',
                                    height: '19.2105263',
                                    rx: '4'
                                }),
                                h(
                                    'g', {
                                        transform: 'scale(0.4) translate(0, 4)'
                                    },
                                    h('path', {
                                        d: 'M19.9559428,5.08900584 L18.7425446,5.08900584 L18.7425446,4.77631513 C18.7425446,4.46430626 18.4886283,4.21052632 18.1767558,4.21052632 L14.384648,4.21052632 C14.0726391,4.21052632 13.8188592,4.46444263 13.8188592,4.77631513 L13.8188592,5.08900584 L12.6055974,5.08900584 C11.6912532,5.08900584 10.9473684,5.83289063 10.9473684,6.74723481 L10.9473684,14.6888697 C10.9473684,15.6032139 11.6912532,16.3470987 12.6055974,16.3470987 L19.9559428,16.3470987 C20.8702869,16.3470987 21.6140354,15.6032139 21.6140354,14.6888697 L21.6140354,6.74723481 C21.6140354,5.83289063 20.8702869,5.08900584 19.9559428,5.08900584 Z M14.6376097,5.02927687 L17.9237941,5.02927687 L17.9237941,5.95289404 L14.6376097,5.95289404 L14.6376097,5.02927687 Z M14.9096629,11.1558602 C14.9096629,10.3998387 15.5246804,9.78482119 16.2807019,9.78482119 C17.0367234,9.78482119 17.6517409,10.3998387 17.6517409,11.1558602 C17.6517409,11.9117453 17.0367234,12.5267628 16.2807019,12.5267628 C15.5246804,12.5267628 14.9096629,11.9117453 14.9096629,11.1558602 Z M13.4239388,15.5283481 C13.7684032,14.2724033 14.9168904,13.3455133 16.2807019,13.3455133 C17.6445134,13.3455133 18.793137,14.2724033 19.1376013,15.5283481 L13.4239388,15.5283481 L13.4239388,15.5283481 Z M20.7952848,14.6890061 C20.7952848,15.1431099 20.4322745,15.511984 19.9815799,15.5258935 C19.720027,14.2917675 18.8554569,13.2791024 17.7116062,12.8098618 C18.1753921,12.4079867 18.4706278,11.8164244 18.4706278,11.1559965 C18.4706278,9.9484622 17.4883726,8.96607063 16.2807019,8.96607063 C15.0730312,8.96607063 14.090776,9.94832584 14.090776,11.1559965 C14.090776,11.8164244 14.3858753,12.4081231 14.8497976,12.8098618 C13.7060832,13.2791024 12.8413768,14.2917675 12.5799603,15.5258935 C12.1292657,15.511984 11.766119,15.1431099 11.766119,14.6890061 L11.766119,6.74723481 C11.766119,6.28440347 12.142766,5.9077564 12.6055974,5.9077564 L13.8188592,5.9077564 L13.8188592,6.20585578 C13.8188592,6.51786465 14.0727755,6.7716446 14.384648,6.7716446 L18.1766194,6.7716446 C18.4886283,6.7716446 18.7424083,6.51772829 18.7424083,6.20585578 L18.7424083,5.9077564 L19.9558064,5.9077564 C20.4186377,5.9077564 20.7951484,6.28440347 20.7951484,6.74723481 L20.7951484,14.6890061 L20.7952848,14.6890061 Z',
                                        fillRule: 'nonzero'
                                    })
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
    type: bpmnNodeType.userTask, // 节点类型
    view: UserTaskView,
    model: UserTaskModel
}
