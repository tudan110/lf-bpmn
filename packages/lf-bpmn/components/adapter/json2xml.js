import extend from '../../utils/extend'
import {bpmnNodeType} from '../constants/bpmn-constant'

function addIndSpace(ind, deep) {
    for (var i = 0; i < deep; i++) {
        ind += '  '
    }
    return ind
}

function toXml(v, name, ind, deep) {

    // 修改 删除连线之后，再次连线时候bpmn:incoming 和bpmn:outgoing位置错乱的问题开始
    let jsonData = extend.deepClone(v)
    if (Object.prototype.toString.call(v) === '[object Object]') {

        let arr = Object.keys(v)

        // bpmn 删除 LogicFlow 携带的 宽高 属性
        removeWidthHeight(name, arr, v)

        if (arr.indexOf(bpmnNodeType.outgoing) > -1
            && arr.indexOf(bpmnNodeType.incoming) > -1
            && name !== bpmnNodeType.subProcess
            && name !== bpmnNodeType.scriptTask
            && name !== bpmnNodeType.serviceTask
            && name !== bpmnNodeType.endEvent) {

            delete v['bpmn:multiInstanceLoopCharacteristics']
            delete v['bpmn:timerEventDefinition']
            delete v['bpmn:outgoing']
            delete v['bpmn:incoming']
            v['bpmn:incoming'] = jsonData['bpmn:incoming']
            v['bpmn:outgoing'] = jsonData['bpmn:outgoing']

            // 将元素是否循环的节点放到outgoing的后面
            if (jsonData['bpmn:multiInstanceLoopCharacteristics']) {
                v['bpmn:multiInstanceLoopCharacteristics'] = jsonData['bpmn:multiInstanceLoopCharacteristics']
            }
            // 将元素的定时中间捕获事件放到outgoing的后面

            if (jsonData['bpmn:timerEventDefinition']) {
                v['bpmn:timerEventDefinition'] = jsonData['bpmn:timerEventDefinition']
            }

            //  console.log("v-after",v)
        } else if (name === bpmnNodeType.subProcess) {

            let incoming_index = arr.indexOf('bpmn:incoming')
            let outgoing_index = arr.indexOf('bpmn:outgoing')
            if (incoming_index > -1) {
                arr.splice(incoming_index, 1)

            } else if (outgoing_index > -1) {
                arr.splice(outgoing_index, 1)
            }
            arr.unshift('bpmn:outgoing')
            arr.unshift('bpmn:incoming')
            arr.forEach(item => {
                delete v[item]
            })
            arr.forEach(item => {
                // console.log('item---', item)
                v[item] = jsonData[item]
            })
        } else if (name === bpmnNodeType.scriptTask) {

            let scriptTask = arr.indexOf('bpmn:script')
            if (scriptTask > -1) {
                arr.splice(scriptTask, 1)
            }

            arr.push('bpmn:script')
            arr.forEach(item => {
                delete v[item]
            })
            arr.forEach(item => {
                // console.log('item---', item)
                v[item] = jsonData[item]
            })
        }
    }

    var xml = ''

    if (v instanceof Array) {
        for (let i = 0, n = v.length; i < n; i++) {
            xml += addIndSpace(ind, deep) + toXml(v[i], name, ind, deep + 1)
        }
    } else if (typeof v == 'object') {

        let hasChild = false

        // 自定义节点标签，适配 bpmn
        let tagName = name
        if (name.startsWith(bpmnNodeType.serviceTask)) {
            // 自定义节点，在保存之前，节点名转换为 bpmn 支持的
            tagName = bpmnNodeType.serviceTask
        }

        xml += addIndSpace(ind, deep) + '<' + tagName
        for (var m in v) {
            if (m.charAt(0) === '-' && m.charAt(1) !== '#') {
                // console.log('json2xml', v, m, v[m])
                xml += ' ' + m.substr(1) + '="' + v[m].toString() + '"'
            } else {
                hasChild = true
            }
        }
        xml += hasChild ? '>' : ' />'
        if (hasChild) {

            // 遍历 json 属性
            if (hasBPMNProperties(v)) {
                for (var m in v) {
                    if (m !== 'bpmn:incoming' && m !== 'bpmn:outgoing' && m !== 'bpmn:script') {
                        if (m === '#text' || m === '-#text') {
                            xml += v[m]
                        } else if (m.indexOf('#cdata') !== -1 || m.indexOf('-#cdata') !== -1) {
                            xml += '<![CDATA[' + v[m] + ']]>'
                        } else if (m.charAt(0) !== '-') {
                            xml += toXml(v[m], m, ind, deep + 1)
                        }
                    }
                }
                // 已知顺序 script, incoming, outgoing
                let bpmnIncoming = v['bpmn:incoming']
                let bpmnOutgoing = v['bpmn:outgoing']
                let bpmnScript = v['bpmn:script']
                xml += toXml(bpmnIncoming, 'bpmn:incoming', ind, deep + 1)
                xml += toXml(bpmnOutgoing, 'bpmn:outgoing', ind, deep + 1)
                xml += toXml(bpmnScript, 'bpmn:script', ind, deep + 1)
            } else {
                for (var m in v) {
                    if (m === '#text' || m === '-#text') {
                        xml += v[m]
                    } else if (m.indexOf('#cdata') !== -1 || m.indexOf('-#cdata') !== -1) {
                        xml += '<![CDATA[' + v[m] + ']]>'
                    } else if (m.charAt(0) !== '-') {
                        xml += toXml(v[m], m, ind, deep + 1)
                    }
                }
            }

            if (m === '#text' || m === '-#text') {
                xml += '</' + tagName + '>'
            } else {
                xml += addIndSpace(ind, deep) + '</' + tagName + '>'
            }

        } else {
            // xml += addIndSpace(ind, deep);
        }
    } else if (v) {
        xml +=
            addIndSpace(ind, deep) + '<' + name + '>' + v.toString() + '</' + name + '>'
    }
    return xml
}

function Json2Xml(o) {
    var xmlStr = ''
    for (var m in o) {
        xmlStr += toXml(o[m], m, '\t\n', 0)
    }
    return xmlStr
}

/**
 * bpmn 删除自定义信息
 * @param arr
 * @param v
 * @param key
 */
function removeInfoKey(arr, v, key) {
    let infoKey = arr.indexOf(key)
    if (infoKey > -1) {
        arr.splice(infoKey, 1)
        delete v[key]
    }
}

/**
 * bpmn 删除 LogicFlow 携带的 宽高 属性
 * @param name
 * @param arr
 * @param v
 */
function removeWidthHeight(name, arr, v) {

    if (name === 'dc:Bounds') {
        return
    }

    removeInfoKey(arr, v, 'width')
    removeInfoKey(arr, v, '-width')
    removeInfoKey(arr, v, 'height')
    removeInfoKey(arr, v, '-height')

}

/**
 * 是否包含 bpmn 属性
 * @param obj
 * @returns {boolean}
 */
function hasBPMNProperties(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return obj.hasOwnProperty('bpmn:script') || obj.hasOwnProperty('bpmn:incoming') || obj.hasOwnProperty('bpmn:outgoing') || obj.hasOwnProperty('bpmn:timerEventDefinition')
}

export {Json2Xml}
