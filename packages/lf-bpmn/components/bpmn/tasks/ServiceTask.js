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

import {bpmnConst, bpmnNodeType} from '../../constants/bpmn-constant'
import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等

class ServiceTaskModel extends RectNodeModel {
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
        this.width = 120
        this.height = 80
    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class ServiceTaskView extends RectNode {
    // 重写父类的方法
    getLabelShape(Atomicpower) {
        let stroke = ''
        if (!Atomicpower) {
            stroke = '#2d8cf0'
        } else {
            stroke = '#ff9900'
        }

        const {model} = this.props
        const {x, y, width, height} = model
        const style = model.getNodeStyle()

        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
        return h(
            'svg',
            {
                x: x - width / 2,
                y: y - height / 2,
                width: 120,
                height: 80,
                viewBox: '0 0 2000 2000'
            },
            [
                h(
                    'g',
                    {
                        transform: 'translate(-300 947.638)',
                    },
                    [
                        h('rect', {
                            stroke: stroke, //边框颜色
                            x: '100',
                            y: '-700.638',
                            width: '2400',
                            height: '1500',
                            fill: 'transparent',
                            strokeLinecap: 'round',
                            strokeWidth: '120',
                            rx: '329.651',
                            ry: '328.5',
                        }),
                        h('path', {
                            d: 'M502.79-516.77c-.028 23.168.007 46.336.067 69.504c-19.758 5.59-37.813 13.39-54.864 22.947l-49.833-49.234l-93.18 93.72l49.829 49.225a246.42 246.42 0 0 0-22.387 54.63l-70.587.128v131.994l71.324-.257c6.522 25.86 20.717 49.109 34.855 69.897v-113.856l-62.346.224v-44.248l62.035-.113l3.482-17.64a202.677 202.677 0 0 1 29.584-72.195l9.884-15.012l-43.584-43.057l31.368-31.55l43.664 43.139l14.86-9.916c22.707-14.982 47.545-25.025 72.312-30.255l17.507-3.635l-.156-60.606h45.064l-.348 60.29h118.245c-11.092-13.24-57.058-30.468-74.208-35.27l.398-68.853c-49.093-.001-87.582.003-132.984-.001zM627.5-390.494l.18 69.501c-19.758 5.59-37.813 13.39-54.864 22.947l-49.834-49.234l-93.181 93.72l49.83 49.225a246.414 246.414 0 0 0-22.388 54.631l-70.585.128v131.993l71.323-.256c5.614 19.573 13.396 37.446 22.934 54.32l-51.03 50.83l94.218 92.6l50.847-50.61a247.423 247.423 0 0 0 55.125 22.405l.034 71.832c45.33.397 93.594.192 132.335.188v-72.682c19.774-5.575 37.885-13.432 54.94-22.984l50.805 50.093l93.242-93.603l-50.912-50.172a246.995 246.995 0 0 0 22.417-54.728l69.117-.427v-131.866l-69.893.426c-5.618-19.591-13.288-37.344-22.952-54.329l48.292-48.416l-94.166-92.757l-48.23 48.395a249.62 249.62 0 0 0-54.904-22.317l.396-68.853H627.501zm43.947 43.833h45.064l-.347 60.29l17.8 3.494c25.844 5.071 50.615 15.116 72.647 29.476l14.918 9.724l42.09-42.233l31.696 31.222l-42.148 42.257l10.14 14.97c14.882 22.463 24.753 46.744 30.326 71.748l3.666 17.54l60.916-.37v44.203l-60.576.373l-3.48 17.54a203.264 203.264 0 0 1-29.617 72.261l-9.896 15.032l44.621 43.973l-31.363 31.484l-44.626-44l-14.834 9.856c-22.715 14.844-47.355 25.124-72.214 30.189l-17.624 3.52v64.005c-12.048.03-25.192.01-44.69-.017l-.028-63.526l-17.704-3.458c-25.88-5.053-50.61-15.051-72.604-29.472l-14.875-9.752l-44.798 44.591l-31.7-31.158l44.86-44.685l-10.237-15.031c-14.895-22.414-24.748-46.721-30.33-71.696l-3.663-17.487l-62.346.223v-44.246l62.035-.114l3.482-17.639a202.696 202.696 0 0 1 29.583-72.196l9.885-15.012l-43.586-43.058l31.368-31.55l43.665 43.14l14.86-9.916c22.737-14.884 46.864-24.76 72.312-30.253l17.51-3.635l-.159-60.607zm23.272 161.057c-54.257 0-98.71 44.455-98.71 98.712c0 54.257 44.453 98.71 98.71 98.71c54.257 0 98.712-44.453 98.712-98.71c0-54.257-44.455-98.712-98.712-98.712zm0 43.833c30.568 0 54.879 24.311 54.879 54.88c0 30.567-24.31 54.876-54.879 54.876c-30.568 0-54.877-24.309-54.877-54.877s24.31-54.88 54.877-54.88z',
                            fill: stroke,
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
        let id = model.id
        let properties = JSON.parse(JSON.stringify(model.properties))
        let Atomicpower = []
        let arrlist = []
        let powerType_id = ''
        let IsAtomicpower = 0 //0：原子能力 1：流程


        if (id.indexOf('_abilityId_') > -1) {
            powerType_id = id.split('_abilityId_')[1]

            Atomicpower = arrlist.map(item => {
                if (item.id == powerType_id) {
                    return item
                }
            }).filter(item => item)
            IsAtomicpower = Atomicpower && Atomicpower[0] && Atomicpower[0].powerType
        } else {
            let dirflowsid = Object.values(properties)[0].value || properties
            if (dirflowsid && dirflowsid.dirflowsid) {
                powerType_id = dirflowsid.dirflowsid
                Atomicpower = arrlist.map(item => {
                    if (item.id == powerType_id) {
                        return item
                    }
                }).filter(item => item)
                IsAtomicpower = Atomicpower && Atomicpower[0].powerType ? Atomicpower[0].powerType : 0
            }
        }

        // 若是已经保存的服务有对应的原子能的id拼接在id上，若是拖入的属性则展示属性dirflowsid
        this.props.model.id =
            this.props.model.id.indexOf(bpmnConst.SERVICE_TASK_PRE) === -1
                ? bpmnConst.SERVICE_TASK_PRE + this.props.model.id
                : this.props.model.id
        return h('g', {}, [
            h('rect', {
                x: x - width / 2,
                y: y - height / 2,
                width,
                height,
                fillOpacity: 0.0,
                strokeOpacity: 0.0
            }),

            this.getLabelShape(IsAtomicpower)
        ])
    }
}

// 导出自定义节点
export default {
    type: bpmnNodeType.serviceTask, // 节点类型
    view: ServiceTaskView,
    model: ServiceTaskModel
}
