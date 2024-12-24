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
                        h('path', {
                            fill: stroke,
                            d: 'm372.82531,209.99999c-0.01892,15.65577 0.00473,31.31154 0.04528,46.96732c-13.35147,3.77744 -25.55213,9.04829 -37.07434,15.50643l-33.67464,-33.26987l-62.96637,63.33127l33.67194,33.26379a166.51828,166.51828 0 0 0 -15.12801,36.91621l-47.69915,0.0865l0,89.19492l48.19718,-0.17367c4.40724,17.47489 13.99951,33.1854 23.55326,47.23289l0,-76.93817l-42.1303,0.15137l0,-29.90058l41.92014,-0.07636l2.35296,-11.92023c3.43146,-17.38502 10.22747,-33.95778 19.99138,-48.78576l6.67911,-10.14436l-29.45188,-29.09576l21.19692,-21.31991l29.50594,29.15117l10.04164,-6.70074c15.34425,-10.12408 32.12853,-16.91064 48.86482,-20.44481l11.83035,-2.45635l-0.10542,-40.95449l30.45199,0l-0.23516,40.74096l79.90404,0c-7.49542,-8.94693 -38.55693,-20.58875 -50.14604,-23.8337l0.26895,-46.5274c-33.17459,-0.00068 -59.18352,0.00203 -89.86392,-0.00068l-0.00068,0zm84.27276,85.33099l0.12163,46.96529c-13.35147,3.77744 -25.55213,9.04829 -37.07434,15.50643l-33.67532,-33.26987l-62.96705,63.33127l33.67261,33.26379a166.51422,166.51422 0 0 0 -15.12869,36.91689l-47.6978,0.0865l0,89.19425l48.19651,-0.17299c3.79366,13.22645 9.05234,25.30413 15.49765,36.70673l-34.48351,34.34836l63.6678,62.57444l34.35985,-34.1997a167.19605,167.19605 0 0 0 37.25071,15.14018l0.02298,48.54046c30.63174,0.26827 63.24613,0.12974 89.42535,0.12704l0,-49.11485c13.36228,-3.76731 25.60078,-9.07667 37.1257,-15.53143l34.33147,33.85034l63.00827,-63.25221l-34.40378,-33.90372a166.90683,166.90683 0 0 0 15.14828,-36.98244l46.7058,-0.28855l0,-89.10843l-47.23018,0.28787c-3.79636,-13.23862 -8.97936,-25.2352 -15.50981,-36.71281l32.63331,-32.7171l-63.63266,-62.68053l-32.59141,32.70291a168.68067,168.68067 0 0 0 -37.10137,-15.08071l0.2676,-46.5274l-89.93892,0l-0.00068,0zm29.69718,29.62014l30.45199,0l-0.23449,40.74096l12.02835,2.36107c17.46408,3.42673 34.20308,10.21463 49.0912,19.9184l10.08084,6.57099l28.44231,-28.53894l21.41857,21.09826l-28.4815,28.55516l6.8521,10.11598c10.05651,15.17937 16.72684,31.58725 20.49279,48.4837l2.4773,11.85265l41.16398,-0.25003l0,29.87017l-40.93422,0.25205l-2.35161,11.85265a137.35562,137.35562 0 0 1 -20.01368,48.83036l-6.68722,10.15787l30.15263,29.71475l-21.19354,21.27531l-30.15601,-29.73299l-10.02407,6.66019c-15.34966,10.03083 -32.00013,16.97754 -48.7986,20.40021l-11.90942,2.37864l0,43.25137c-8.14143,0.02027 -17.02349,0.00676 -30.19926,-0.01149l-0.01892,-42.92768l-11.96348,-2.33674c-17.48841,-3.41456 -34.1997,-10.17071 -49.06214,-19.9157l-10.05178,-6.58991l-30.27224,30.13236l-21.42127,-21.05501l30.31414,-30.19588l-6.91765,-10.1572c-10.06529,-15.14626 -16.72346,-31.57171 -20.49549,-48.44856l-2.47527,-11.81684l-42.1303,0.15069l0,-29.89923l41.92014,-0.07704l2.35296,-11.91955a136.97179,136.97179 0 0 1 19.99071,-48.78644l6.67979,-10.14436l-29.45323,-29.09644l21.19692,-21.31991l29.50662,29.15185l10.04164,-6.70074c15.36452,-10.05786 31.66834,-16.73157 48.86482,-20.44346l11.83238,-2.45635l-0.10744,-40.95517l0.00068,0zm15.72605,108.83424c-36.66416,0 -66.70327,30.04046 -66.70327,66.70462c0,36.66416 30.03911,66.70327 66.70327,66.70327c36.66416,0 66.70462,-30.03911 66.70462,-66.70327c0,-36.66416 -30.04046,-66.70462 -66.70462,-66.70462zm0,29.62014c20.65632,0 37.08448,16.42815 37.08448,37.08515c0,20.65565 -16.42748,37.08245 -37.08448,37.08245c-20.65632,0 -37.08312,-16.4268 -37.08312,-37.08312s16.42748,-37.08515 37.08312,-37.08515l0,0.00068z',
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
