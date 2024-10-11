import {PolylineEdge, PolylineEdgeModel} from '@logicflow/core'
import executionstatus from './executionstatus'
import store from '@/store'


class SequenceModel extends PolylineEdgeModel {
    setAttributes() {
        this.offset = 20
    }

    getAnimation() {

        const animation = super.getAnimation()
        animation.stroke = 'red'
        return animation
    }

    getEdgeStyle() {

        const style = super.getEdgeStyle()
        const {properties, targetNodeId} = this

        let status = executionstatus(store.state.logicFlow.runState, targetNodeId)

        if (properties.isActived) {
            style.strokeDasharray = '4 4'
        }
        if (status === 2) {
            style.stroke = '#ccced1'
        } else if (status === 0) {
            style.stroke = '#2d8cf0' //线条默认颜色
        }

        return style
    }

    getTextStyle() {
        const style = super.getTextStyle()

        return style
    }

    getOutlineStyle() {
        const style = super.getOutlineStyle()
        style.strokeWidth = '0'
        // style.hover.stroke = "red";
        return style
    }
}

export default {
    type: 'bpmn:sequenceFlow',
    view: PolylineEdge,
    model: SequenceModel
}
