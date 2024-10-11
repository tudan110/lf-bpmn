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
    let jsoandata = extend.deepClone(v)
    if (Object.prototype.toString.call(v) === '[object Object]') {
        let arr = Object.keys(v)

        if (arr.indexOf(bpmnNodeType.outgoing) > -1
            && arr.indexOf(bpmnNodeType.incoming) > -1
            && name !== bpmnNodeType.subProcess
            && name !== bpmnNodeType.scriptTask
            && name !== bpmnNodeType.serviceTask
            && name !== bpmnNodeType.serviceTaskApi
            && name !== bpmnNodeType.serviceTaskRestful
            && name !== bpmnNodeType.serviceTaskParamConversion
            && name !== bpmnNodeType.serviceTaskCmdAggregation
            && name !== bpmnNodeType.endEvent
            && name !== bpmnNodeType.mtExtract
            && name !== bpmnNodeType.mtQuery
            && name !== bpmnNodeType.mtJoin
            && name !== bpmnNodeType.mtConnect
            && name !== bpmnNodeType.mtCompare
            && name !== bpmnNodeType.mtLoad
            && name !== bpmnNodeType.mtLoadKafka
            && name !== bpmnNodeType.mtLoadCeph
            && name !== bpmnNodeType.mtLoadSftp) {

            delete v['bpmn:multiInstanceLoopCharacteristics']
            delete v['bpmn:timerEventDefinition']
            delete v['bpmn:outgoing']
            delete v['bpmn:incoming']
            v['bpmn:incoming'] = jsoandata['bpmn:incoming']
            v['bpmn:outgoing'] = jsoandata['bpmn:outgoing']

            // 将元素是否循环的节点放到outgoing的后面
            if (jsoandata['bpmn:multiInstanceLoopCharacteristics']) {
                v['bpmn:multiInstanceLoopCharacteristics'] = jsoandata['bpmn:multiInstanceLoopCharacteristics']
            }
            // 将元素的定时器节点放到outgoing的后面

            if (jsoandata['bpmn:timerEventDefinition']) {
                v['bpmn:timerEventDefinition'] = jsoandata['bpmn:timerEventDefinition']
            }

            //  console.log("v-after",v)
        } else if (name === bpmnNodeType.subProcess) {

            let incoming_index = arr.indexOf('bpmn:incoming')
            let outcoming_index = arr.indexOf('bpmn:outgoing')
            if (incoming_index > -1) {
                arr.splice(incoming_index, 1)

            } else if (outcoming_index > -1) {
                arr.splice(outcoming_index, 1)
            }
            arr.unshift('bpmn:outgoing')
            arr.unshift('bpmn:incoming')
            arr.forEach(item => {
                delete v[item]
            })
            arr.forEach(item => {
                // console.log('item---', item)
                v[item] = jsoandata[item]
            })
        } else if (name === bpmnNodeType.scriptTask) {

            let scriptTask = arr.indexOf('bpmn:script')
            if (scriptTask > -1) {
                arr.splice(scriptTask, 1)
            }

            /* 脚本参数映射信息不要保存到 xml 里面 start */
            let info = arr.indexOf('info')
            if (info > -1) {
                arr.splice(info, 1)
                delete v['info']
            }

            let inputParamList = arr.indexOf('inputParamList')
            if (inputParamList > -1) {
                arr.splice(inputParamList, 1)
                delete v['inputParamList']
            }

            let outputParamList = arr.indexOf('outputParamList')
            if (outputParamList > -1) {
                arr.splice(outputParamList, 1)
                delete v['outputParamList']
            }
            /* 自定义参数映射信息不要保存到 xml 里面 end */

            arr.push('bpmn:script')
            arr.forEach(item => {
                delete v[item]
            })
            arr.forEach(item => {
                // console.log('item---', item)
                v[item] = jsoandata[item]
            })
        } else if (name === bpmnNodeType.serviceTask
            || name === bpmnNodeType.serviceTaskApi
            || name === bpmnNodeType.serviceTaskRestful) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeApiInfo(arr, v)
            removeVcmdInfo(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.serviceTaskParamConversion) {

            /* 结束事件参数映射信息不要保存到 xml 里面 start */
            // removeApiInfo(arr, v)
            removeParamConversionList(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.endEvent || name === bpmnNodeType.serviceTaskCmdAggregation) {

            /* 结束事件参数映射信息不要保存到 xml 里面 start */
            removeApiInfo(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtExtract) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtQuery) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeParamMappingList(arr, v)
            removeMtRuleForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtJoin) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeParamMappingList(arr, v)
            removeMtForm(arr, v)
            removeMtRuleForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtConnect) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeParamMappingList(arr, v)
            removeMtForm(arr, v)
            removeMtRuleForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtCompare) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeParamMappingList(arr, v)
            removeMtForm(arr, v)
            removeMtRuleForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtLoad) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeMtForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtLoadKafka) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeMtForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtLoadCeph) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeMtForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

        } else if (name === bpmnNodeType.mtLoadSftp) {

            /* 服务节点参数映射信息不要保存到 xml 里面 start */
            removeMtForm(arr, v)
            /* 自定义参数映射信息不要保存到 xml 里面 end */

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
        if (name === bpmnNodeType.serviceTaskApi
            || name === bpmnNodeType.serviceTaskRestful
            || name === bpmnNodeType.serviceTaskParamConversion
            || name === bpmnNodeType.serviceTaskCmdAggregation
            || name === bpmnNodeType.mtExtract
            || name === bpmnNodeType.mtQuery
            || name === bpmnNodeType.mtJoin
            || name === bpmnNodeType.mtConnect
            || name === bpmnNodeType.mtCompare
            || name === bpmnNodeType.mtLoad
            || name === bpmnNodeType.mtLoadKafka
            || name === bpmnNodeType.mtLoadCeph
            || name === bpmnNodeType.mtLoadSftp) {
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
 * bpmn 删除自定义信息
 * @param arr
 * @param v
 */
function removeApiInfo(arr, v) {
    removeInfoKey(arr, v, 'info')
    removeInfoKey(arr, v, '-info')

    removeInfoKey(arr, v, 'dirflowsid')
    removeInfoKey(arr, v, '-dirflowsid')

    removeInfoKey(arr, v, 'inputParamList')
    removeInfoKey(arr, v, '-inputParamList')

    removeInfoKey(arr, v, 'outputParamList')
    removeInfoKey(arr, v, '-outputParamList')
}

/**
 * bpmn 删除自定义信息
 * @param arr
 * @param v
 */
function removeVcmdInfo(arr, v) {
    removeInfoKey(arr, v, 'virtualCmdInputParamList')
    removeInfoKey(arr, v, '-virtualCmdInputParamList')

    removeInfoKey(arr, v, 'virtualCmdOutputParamList')
    removeInfoKey(arr, v, '-virtualCmdOutputParamList')
}

/**
 * bpmn 删除自定义参数映射信息
 * @param arr
 * @param v
 */
function removeParamMappingList(arr, v) {
    removeInfoKey(arr, v, 'paramMappingList')
    removeInfoKey(arr, v, '-paramMappingList')
}

/**
 * bpmn 删除自定义参数映射信息
 * @param arr
 * @param v
 */
function removeParamConversionList(arr, v) {
    removeInfoKey(arr, v, 'paramConversionList')
    removeInfoKey(arr, v, '-paramConversionList')
}

/**
 * bpmn 删除自定义模转表单信息
 * @param arr
 * @param v
 */
function removeMtForm(arr, v) {
    removeInfoKey(arr, v, 'form')
    removeInfoKey(arr, v, '-form')
}

/**
 * bpmn 删除自定义模转转换规则表单信息
 * @param arr
 * @param v
 */
function removeMtRuleForm(arr, v) {
    removeInfoKey(arr, v, 'ruleForm')
    removeInfoKey(arr, v, '-ruleForm')
}

/**
 * 是否包含 bpmn 属性
 * @param obj
 * @returns {boolean}
 */
function hasBPMNProperties(obj) {
    return obj.hasOwnProperty('bpmn:script') || obj.hasOwnProperty('bpmn:incoming') || obj.hasOwnProperty('bpmn:outgoing')
}

export {Json2Xml}
