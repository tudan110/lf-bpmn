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

import {bpmnConst, bpmnNodeType} from '@/constants/bpmn-constant'
import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class CustomTaskModel extends RectNodeModel {
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
        this.width = 64
        this.height = 64
        // this.x = this.x + 44.5
        // this.y = this.y + 44


    }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class CustomTaskView extends RectNode {
    // 重写父类的方法
    getLabelShape() {
        const {model} = this.props
        const {x, y, width, height} = model
        const style = model.getNodeStyle()
        this.props.model.id =
            this.props.model.id.indexOf(bpmnConst.SERVICE_TASK_CUSTOM_PRE) === -1
                ? bpmnConst.SERVICE_TASK_CUSTOM_PRE + this.props.model.id
                : this.props.model.id

        // svg dom <svg x="0" y="0" width="25" height="25" viewBox="0 0 1274 1024">
        return h(
            'svg',
            {
                x: x - width / 2,
                y: y - height / 2,
                width: 64,
                height: 64,
                viewBox: '0 0 1024 1024'
            },
            [
                h('path', {
                    fill: '#5389F5',
                    d: 'M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z',
                }),
                h('path', {
                    fill: '#C4D6FC',
                    d: 'M472 592c15.1 0 29 5.3 40 14.1V512h-94.4c9-11 14.4-25.1 14.4-40.5 0-35.3-28.7-64-64-64s-64 28.7-64 64c0 15.4 5.4 29.5 14.4 40.5H224v256c0 17.7 14.3 32 32 32h256v-94.1c-11 8.8-24.9 14.1-40 14.1-35.3 0-64-28.7-64-64s28.7-64 64-64z',
                }),
                h('path', {
                    fill: '#F1F6FE',
                    d: 'M432 472c0 15.1-5.3 29-14.1 40H512v-94.4c11 9 25.1 14.4 40.5 14.4 35.3 0 64-28.7 64-64s-28.7-64-64-64c-15.4 0-29.5 5.4-40.5 14.4V224H256c-17.7 0-32 14.3-32 32v256h94.1c-8.8-11-14.1-24.9-14.1-40 0-35.3 28.7-64 64-64s64 28.7 64 64z',
                }),
                h('path', {
                    fill: '#A2BFFA',
                    d: 'M592 552c0-15.1 5.3-29 14.1-40H512v94.4c-11-9-25.1-14.4-40.5-14.4-35.3 0-64 28.7-64 64s28.7 64 64 64c15.4 0 29.5-5.4 40.5-14.4V800h256c17.7 0 32-14.3 32-32V512h-94.1c8.8 11 14.1 24.9 14.1 40 0 35.3-28.7 64-64 64s-64-28.7-64-64z',
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
    name: '自定义任务', // 必填：拖拽面板上的组件展示名称
    icon: 'custom-task', // 必填：拖拽面板上的组件图标，和 assets/icons/svgs 文件名保持一致
    type: bpmnNodeType.serviceTaskCustom, // 节点类型
    view: CustomTaskView,
    model: CustomTaskModel,
}
