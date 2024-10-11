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
import {bpmnConst} from '@/utils/constant/ctr-constant'
import {h, RectNode, RectNodeModel} from '@logicflow/core' // 用于创建虚拟dom // 用于继承基础节点

// 自定义节点的model 可以修改节点的样式，基础形状，位置等
class StartNodeModel extends RectNodeModel {

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

  getTextStyle() {
    const style = super.getTextStyle()
    style.fontSize = 14
    style.color = '#606266'
    style.dy = 44
    return style
  }

  initNodeData(data) {
    super.initNodeData(data)
    this.width = 60
    this.height = 60
  }
}

// 自定义节点的view 可以修改更复杂的节点样式，比如节点的图标，文字等
class StartNodeView extends RectNode {
  // 重写父类的方法
  getLabelShape() {
    const {model} = this.props
    const {x, y, width, height} = model
    const style = model.getNodeStyle()
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
          innerText: '开始节点'
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
                transform: 'translate(-488.000000, -142.000000)',
                fill: '#FF9900'
              },
              [
                h(
                  'g',
                  {
                    id: '编组-49',
                    transform: 'translate(488.000000, 142.000000)',
                    fill: '#FF9900'
                  },
                  [
                    h('circle', {
                      id: '椭圆形',
                      stroke: '#ff9900',
                      fillOpacity: '0.05',
                      cx: '12',
                      cy: '12',
                      r: '11.5'
                    }),
                    h('path', {
                      id: '路径',
                      d: 'M10.1033239,5.42464128 L17.8692287,11.3307037 C18.0376253,11.4868004 18.1333333,11.7060096 18.1333333,11.9356077 C18.1333333,12.1652058 18.0376253,12.384415 17.8692287,12.5405117 L10.1033239,18.4465741 C9.76232808,18.6995339 9.33333333,18.3695863 9.33333333,17.8416701 L9.33333333,6.02954526 C9.33333333,5.50162907 9.76232808,5.16068319 10.1033239,5.42464128 Z',
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
    this.props.model.id =
      this.props.model.id.indexOf(bpmnConst.START_EVENT_PRE) === -1
        ? bpmnConst.START_EVENT_PRE + this.props.model.id
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
      this.getLabelShape()
    ])
  }
}

// 导出自定义节点
export default {
  type: 'bpmn:startEvent', // 节点类型
  view: StartNodeView,
  model: StartNodeModel
}
