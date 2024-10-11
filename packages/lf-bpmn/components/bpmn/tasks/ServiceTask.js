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
import store from '@/store'
import executionstatus from './executionstatus'
import {bpmnNodeType} from '@/utils/constant/bpmn-constant'

// 自定义节点的model 可以修改节点的样式，基础形状，位置等

class ServiceTaskModel extends RectNodeModel {
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
class ServiceTaskView extends RectNode {
  // 重写父类的方法
  getLabelShape(Atomicpower, Executionstatus = 0) {
    let shape = ''
    let stroke = ''
    if (!Atomicpower) {
      shape = 'M7.57894737,5 C8.34268479,5 8.9797739,5.5422459 9.12622727,6.26275027 L15.756,6.262 L15.7566013,6.25241886 C15.8176801,5.68876095 16.295101,5.25 16.875,5.25 C17.4963203,5.25 18,5.75367966 18,6.375 C18,6.99632034 17.4963203,7.5 16.875,7.5 L16.821026,7.49769097 C16.8950299,7.51641029 16.972674,7.52631579 17.0526316,7.52631579 C17.1632982,7.52631579 17.2695328,7.50734043 17.3682595,7.47246582 L17.3684211,16.6315789 C17.3684211,17.1838637 16.9207058,17.6315789 16.3684211,17.6315789 L9.68133143,17.6325065 C9.75136251,17.4346999 9.78947368,17.2218006 9.78947368,17 L15.7368421,17 C16.2891269,17 16.7368421,16.5522847 16.7368421,16 L16.7368421,7.89473684 C16.7368421,7.7450683 16.7039617,7.60307938 16.6450303,7.47559947 C16.3140355,7.40692566 16.0383148,7.19462918 15.8837371,6.90746126 C15.8365403,6.898448 15.7871246,6.89473684 15.7368421,6.89473684 L9.12622727,6.89514446 C9.00053968,7.51348777 8.51348777,8.00053968 7.89514446,8.12622727 L7.894,15.001 L8.02153015,15.0056412 C8.98857951,15.0803938 9.75,15.8887772 9.75,16.875 C9.75,17.9105339 8.91053391,18.75 7.875,18.75 C6.83946609,18.75 6,17.9105339 6,16.875 C6,16.054642 6.5268432,15.3573348 7.26064213,15.1029658 L7.26275027,8.12622727 C6.5422459,7.9797739 6,7.34268479 6,6.57894737 C6,5.70691882 6.70691882,5 7.57894737,5 Z M7.875,15.75 C7.25367966,15.75 6.75,16.2536797 6.75,16.875 C6.75,17.4963203 7.25367966,18 7.875,18 C8.49632034,18 9,17.4963203 9,16.875 C9,16.2536797 8.49632034,15.75 7.875,15.75 Z M12.2298947,8.95621053 C12.8665263,8.95621053 13.3667368,9.08505263 13.7229474,9.35031579 C14.1018947,9.63073684 14.3216842,10.0703158 14.3747368,10.6614737 L13.4955789,10.6614737 C13.4197895,10.328 13.2757895,10.0854737 13.0787368,9.94147368 C12.8816842,9.78989474 12.5785263,9.72168421 12.1844211,9.72168421 C11.8433684,9.72168421 11.5856842,9.76715789 11.4037895,9.86568421 C11.1764211,9.97936842 11.0703158,10.1688421 11.0703158,10.4265263 C11.0703158,10.6538947 11.1915789,10.8433684 11.4492632,10.9797895 C11.5629474,11.0404211 11.8736842,11.1541053 12.3738947,11.3132632 C13.1090526,11.5406316 13.5789474,11.7225263 13.7911579,11.8437895 C14.2610526,12.1242105 14.496,12.5107368 14.496,13.0109474 C14.496,13.496 14.3065263,13.8825263 13.9275789,14.1629474 C13.5486316,14.4357895 13.0105263,14.5797895 12.3208421,14.5797895 C11.6538947,14.5797895 11.1309474,14.4509474 10.7595789,14.1932632 C10.3048421,13.8749474 10.0547368,13.3747368 10.0168421,12.6850526 L10.896,12.6850526 C10.9566316,13.0943158 11.1006316,13.3898947 11.3355789,13.5642105 C11.5477895,13.7157895 11.8736842,13.7991579 12.3208421,13.7991579 C12.7149474,13.7991579 13.0332632,13.7309474 13.2606316,13.6021053 C13.488,13.4656842 13.6092632,13.2913684 13.6092632,13.064 C13.6092632,12.776 13.4349474,12.5486316 13.1014737,12.3818947 C12.9953684,12.3288421 12.6467368,12.2075789 12.048,12.0256842 C11.3810526,11.8134737 10.9642105,11.6618947 10.8050526,11.5709474 C10.3882105,11.3208421 10.1835789,10.9570526 10.1835789,10.4795789 C10.1835789,10.0021053 10.3806316,9.62315789 10.7898947,9.35031579 C11.1688421,9.08505263 11.6463158,8.95621053 12.2298947,8.95621053 Z M16.875,5.7 C16.5022078,5.7 16.2,6.00220779 16.2,6.375 C16.2,6.74779221 16.5022078,7.05 16.875,7.05 C17.2477922,7.05 17.55,6.74779221 17.55,6.375 C17.55,6.00220779 17.2477922,5.7 16.875,5.7 Z'
      stroke = '#2d8cf0'
    } else {
      shape = 'M8.1,11.6L8.1,11.6C7.9,12,8,12.4,8.4,12.5l2.8,0.6l-2.6,6.2c-0.2,0.5,0.5,1,0.9,0.6l7.2-7.4l0,0c0.3-0.3,0.1-0.8-0.3-0.9L13.8,11l2.2-6.4c0.2-0.5-0.5-0.9-0.9-0.5L8.1,11.6L8.1,11.6z M14.2,6.7l-1.6,4.6l0,0c-0.1,0.3,0.1,0.6,0.4,0.7l2.3,0.5l-4.6,4.7l1.8-4.2l0,0c0.1-0.3-0.1-0.6-0.4-0.7l-2.6-0.5L14.2,6.7z'
      stroke = '#ff9900'
    }
    if (Executionstatus === 1) {
      stroke = 'red'
    } else if (Executionstatus === 2) {
      stroke = '#ccced1'
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
        width: 60,
        height: 60,
        viewBox: '0 0 26 26'
      },
      [
        // svg dom <path fill="#2D8CF0" d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448-200.96 448-448 448z m0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384z"></path>
        h('title', {
          innerText: '原子能力'
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
                id: '原子能力',
                transform: 'translate(1.000000, 1.000000)',
                fill: stroke,
                fillRule: 'nonzero'
              },
              [
                h('rect', {
                  id: '矩形',
                  stroke: stroke, //边框颜色
                  x: '0',
                  y: '0',
                  width: '24',
                  height: '24',
                  rx: '4',
                  fillOpacity: '0.05'
                }),
                h('path', {
                  id: '形状结合',
                  d: shape
                  // stroke: "#B37FEC",
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

    function flatten(arr) {

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          flatten(arr[i].children)
        } else {
          arrlist.push(arr[i])
        }
      }
    }

    const {model, graphModel} = this.props
    const {x, y, width, height, radius} = model
    let diratomicData = JSON.parse(JSON.stringify(store.state.logicFlow.diratomicData))
    let id = model.id
    let properties = JSON.parse(JSON.stringify(model.properties))
    let Atomicpower = []
    let arrlist = []
    let powerType_id = ''
    let IsAtomicpower = 0 //0：原子能力 1：流程
    let Executionstatus //0：节点执行成功 0：节点执行失败
    flatten(diratomicData)


    if (id.indexOf(bpmnConst.ABILITY_ID_SYMBOL) > -1) {
      powerType_id = id.split(bpmnConst.ABILITY_ID_SYMBOL)[1]

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
    if (store.state.logicFlow.runState && store.state.logicFlow.runState.length > 0) {
      Executionstatus = executionstatus(store.state.logicFlow.runState, id)
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

      this.getLabelShape(IsAtomicpower, Executionstatus)
    ])
  }
}

// 导出自定义节点
export default {
  type: bpmnNodeType.serviceTask, // 节点类型
  view: ServiceTaskView,
  model: ServiceTaskModel
}
