import * as _BPMNAdaper from '@logicflow/extension/es/bpmn-adapter/index'
import {getBpmnId} from '@logicflow/extension/es/bpmn-adapter/bpmnIds'
import {bpmnConst, bpmnNodeType} from '../constants/bpmn-constant'

var __read =
    (this && this.__read) ||
    function (o, n) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator]
        if (!m) return o
        var i = m.call(o),
            r,
            ar = [],
            e
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value)
        } catch (error) {
            e = {error: error}
        } finally {
            try {
                if (r && !r.done && (m = i['return'])) m.call(i)
            } finally {
                if (e)
                    // eslint-disable-next-line no-unsafe-finally
                    throw e.error
            }
        }
        return ar
    }

export function adapterOut(data) {
    console.log('rawData', data)
    const bpmnProcessData = {
        '-id': 'process_' + getBpmnId(),
        '-isExecutable': 'false'
    }
    convertLf2ProcessData(bpmnProcessData, data)
    const bpmnDiagramData = {
        '-id': 'BPMNPlane_1',
        '-bpmnElement': bpmnProcessData['-id']
    }
    convertLf2DiagramData(bpmnDiagramData, data)
    return {
        'bpmn:definitions': {
            '-id': 'Definitions_' + getBpmnId(),
            '-xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '-xmlns:bpmn': 'http://www.omg.org/spec/BPMN/20100524/MODEL',
            '-xmlns:bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
            '-xmlns:dc': 'http://www.omg.org/spec/DD/20100524/DC',
            '-xmlns:di': 'http://www.omg.org/spec/DD/20100524/DI',
            '-xmlns:modeler': 'http://camunda.org/schema/modeler/1.0',
            '-targetNamespace': 'http://bpmn.io/schema/bpmn',
            '-exporter': 'bpmn-js (https://demo.bpmn.io)',
            '-exporterVersion': '5.16.0',
            '-modeler:executionPlatform': 'Camunda Platform',
            '-modeler:executionPlatformVersion': '7.17.0',
            'bpmn:process': bpmnProcessData,
            'bpmndi:BPMNDiagram': {
                '-id': 'BPMNDiagram_1',
                'bpmndi:BPMNPlane': bpmnDiagramData
            }
        }
    }
}

function convertLf2ProcessData(bpmnProcessData, data) {

    const nodeMap = new Map()
    data.nodes.forEach(function (node) {
        let _a
        const processNode = {
            '-id': node.id
        }
        if ((_a = node.text) === null || _a === void 0 ? void 0 : _a.value) {
            processNode['-name'] = node.text.value
        }
        if (node.properties) {
            const properties = toXmlJson(node.properties)
            Object.assign(processNode, properties)
        }
        nodeMap.set(node.id, processNode)

        if (!bpmnProcessData[node.type]) {
            bpmnProcessData[node.type] = processNode // 如果只有一个子元素，json中表示为正常属性
        } else if (Array.isArray(bpmnProcessData[node.type])) {
            // 如果是多个子元素，json中使用数组存储
            bpmnProcessData[node.type].push(processNode)
        } else {
            // 如果是多个子元素，json中使用数组存储
            bpmnProcessData[node.type] = [bpmnProcessData[node.type], processNode]
        }
    })
    // console.log('data.nodes----------------------------------->', data.nodes)
    bpmnProcessData['bpmn:sequenceFlow'] = data.edges.map(function (edge) {

        var _a, _b
        var targetNode = nodeMap.get(edge.targetNodeId)
        // @see https://github.com/didi/LogicFlow/issues/325
        // 需要保证incomming在outgoing之前
        if (!targetNode['bpmn:incoming']) {
            targetNode['bpmn:incoming'] = edge.id
        } else if (Array.isArray(targetNode['bpmn:incoming'])) {
            targetNode['bpmn:incoming'].push(edge.id)
        } else {
            targetNode['bpmn:incoming'] = [targetNode['bpmn:incoming'], edge.id]
        }
        var sourceNode = nodeMap.get(edge.sourceNodeId)
        if (!sourceNode['bpmn:outgoing']) {
            sourceNode['bpmn:outgoing'] = edge.id
        } else if (Array.isArray(sourceNode['bpmn:outgoing'])) {
            sourceNode['bpmn:outgoing'].push(edge.id)
        } else {
            // 字符串转数组
            sourceNode['bpmn:outgoing'] = [sourceNode['bpmn:outgoing'], edge.id]
        }
        var edgeConfig = {
            '-id': edge.id,
            '-sourceRef': edge.sourceNodeId,
            '-targetRef': edge.targetNodeId
        }
        if ((_a = edge.text) === null || _a === void 0 ? void 0 : _a.value) {
            edgeConfig['-name'] =
                (_b = edge.text) === null || _b === void 0 ? void 0 : _b.value
        }
        if (edge.properties) {
            var properties = toXmlJson(edge.properties)
            Object.assign(edgeConfig, properties)
        }
        return edgeConfig

    })

}

function toXmlJson(json) {
    var xmlJson
    if (Object.prototype.toString.call(json) === '[object Array]') {
        xmlJson = []
        json.map((item) => {
            var _xmlJson = {}
            Object.entries(item).forEach(function (_a) {
                var _b = __read(_a, 2),
                    key = _b[0],
                    value = _b[1]
                if (typeof value !== 'object') {
                    if (key.indexOf('-') === 0) {
                        // 如果本来就是“-”开头的了，那就不处理了。
                        _xmlJson[key] = value
                    } else {
                        _xmlJson['-' + key] = value
                    }
                } else {
                    _xmlJson[key] = toXmlJson(value)
                }
            })
            xmlJson.push(_xmlJson)
        })
    } else if (
        Object.prototype.toString.call(json) === '[object Object]' &&
        Object.keys(json).indexOf('0') > -1
    ) {
        xmlJson = []
        Object.values(json).forEach((_v) => {
            var _xmlJson = {}
            Object.entries(_v).forEach(function (_a) {
                var _b = __read(_a, 2),
                    key = _b[0],
                    value = _b[1]
                if (typeof value !== 'object') {
                    if (key.indexOf('-') === 0) {
                        // 如果本来就是“-”开头的了，那就不处理了。
                        _xmlJson[key] = value
                    } else {
                        _xmlJson['-' + key] = value
                    }
                } else {
                    _xmlJson[key] = toXmlJson(value)
                }
            })
            xmlJson.push(_xmlJson)
        })
    } else {
        xmlJson = {}
        if (json) {
            Object.entries(json).forEach(function (_a) {
                var _b = __read(_a, 2),
                    key = _b[0],
                    value = _b[1]

                // 判断 value 是否是 null @date 2024-02-28 15:31:55
                if (typeof value !== 'object' || !value) {

                    if (key.indexOf('-') === 0) {
                        // 如果本来就是“-”开头的了，那就不处理了。
                        xmlJson[key] = value
                    } else {
                        xmlJson['-' + key] = value
                    }

                } else {

                    xmlJson[key] = toXmlJson(value)

                }

            })
        }
    }

    return xmlJson
}

function convertLf2DiagramData(bpmnDiagramData, data) {
    bpmnDiagramData['bpmndi:BPMNEdge'] = data.edges.map(function (edge) {
        var _a
        var edgeId = edge.id
        var pointsList = edge.pointsList.map(function (_a) {
            var x = _a.x,
                y = _a.y
            return {'-x': x, '-y': y}
        })
        var diagramData = {
            '-id': edgeId + '_di',
            '-bpmnElement': edgeId,
            'di:waypoint': pointsList
        }
        if ((_a = edge.text) === null || _a === void 0 ? void 0 : _a.value) {
            diagramData['bpmndi:BPMNLabel'] = {
                'dc:Bounds': {
                    '-x': edge.text.x - (edge.text.value.length * 10) / 2,
                    '-y': edge.text.y - 7,
                    '-width': edge.text.value.length * 10,
                    '-height': 14
                }
            }
        }
        return diagramData
    })
    bpmnDiagramData['bpmndi:BPMNShape'] = data.nodes.map(function (node) {
        var _a
        var nodeId = node.id
        var width = 100
        var height = 80
        var x = node.x,
            y = node.y
        // bpmn坐标是基于左上角，LogicFlow基于中心点，此处处理一下。
        var shapeConfig = _BPMNAdaper.BpmnAdapter.shapeConfigMap.get(node.type)
        if (shapeConfig) {
            width = shapeConfig.width
            height = shapeConfig.height
        }
        // 新增节点的保持之后会更改位置的问题
        if (node.type === bpmnNodeType.parallelGateway
            || node.type === bpmnNodeType.intermediateCatchEvent
            || node.type === bpmnNodeType.subProcess
            || node.type === bpmnNodeType.serviceTaskApi
            || node.type === bpmnNodeType.serviceTaskRestful
            || node.type === bpmnNodeType.serviceTaskParamConversion
            || node.type === bpmnNodeType.serviceTaskCmdAggregation
            || node.type === bpmnNodeType.mtExtract
            || node.type === bpmnNodeType.mtQuery
            || node.type === bpmnNodeType.mtJoin
            || node.type === bpmnNodeType.mtConnect
            || node.type === bpmnNodeType.mtCompare
            || node.type === bpmnNodeType.mtLoad
            || node.type === bpmnNodeType.mtLoadKafka
            || node.type === bpmnNodeType.mtLoadCeph
            || node.type === bpmnNodeType.mtLoadSftp) {
            width = 60
            height = 60
        } else if (node.type === bpmnNodeType.scriptTask) {
            width = 75
            height = 75
        } else {
            x -= width / 2
            y -= height / 2
        }

        // x -= width / 2;
        // y -= height / 2;

        var diagramData = {
            '-id': nodeId + '_di',
            '-bpmnElement': nodeId,
            'dc:Bounds': {
                '-x': x,
                '-y': y,
                '-width': width,
                '-height': height
            }
        }
        if ((_a = node.text) === null || _a === void 0 ? void 0 : _a.value) {
            diagramData['bpmndi:BPMNLabel'] = {
                'dc:Bounds': {
                    '-x': node.text.x - (node.text.value.length * 10) / 2,
                    '-y': node.text.y - 7,
                    '-width': node.text.value.length * 10,
                    '-height': 14
                }
            }
        }
        return diagramData
    })
}

/**
 * 模转获取前序节点
 *
 * @param data          流程图原始数据
 * @param currentNodeId 当前节点Id
 */
export function getPreNodes(data, currentNodeId) {

    const edges = data.edges
    const nodes = data.nodes
    const previousNodeIds = []

    findPrevious(edges, currentNodeId, previousNodeIds)
    // console.log('获取前序节点出参信息', previousNodeIds)

    previousNodeIds.reverse()

    // result
    return nodes
        .filter(item => previousNodeIds.includes(item.id))
        .sort((a, b) => previousNodeIds.indexOf(a.id) - previousNodeIds.indexOf(b.id))
        .filter(item =>
            item.type === bpmnNodeType.scriptTask
            || item.type.startsWith(bpmnNodeType.mtPre))
        .map(item => {

            let label = item.text.value
            let value = item.id

            return {
                key: value,
                label: label,
                value: value
            }

        })

}

/**
 * 获取前序节点出参信息，包含 API 初始入参
 *
 * @param data          流程图原始数据
 * @param currentNodeId 当前节点Id
 * @param paramDefs     参数定义信息
 * @param apiQueryInput API query 入参定义信息
 * @param apiBodyInput  API body 入参定义信息
 */
export function getPreNodesOutputParams(data, currentNodeId, paramDefs, apiQueryInput, apiBodyInput) {

    const edges = data.edges
    const nodes = data.nodes
    const previousNodeIds = []

    findPrevious(edges, currentNodeId, previousNodeIds)
    // console.log('获取前序节点出参信息', previousNodeIds)

    previousNodeIds.reverse()

    // result
    return nodes
        .filter(item => previousNodeIds.includes(item.id))
        .sort((a, b) => previousNodeIds.indexOf(a.id) - previousNodeIds.indexOf(b.id))
        .filter(item =>
            item.type === bpmnNodeType.startEvent
            || item.type === bpmnNodeType.scriptTask
            || item.type === bpmnNodeType.serviceTask
            || item.type === bpmnNodeType.serviceTaskApi
            || item.type === bpmnNodeType.serviceTaskRestful
            || item.type === bpmnNodeType.serviceTaskParamConversion
            || item.type === bpmnNodeType.serviceTaskCmdAggregation)
        .map(item => {
            const groupType = item.type
            if (groupType === bpmnNodeType.startEvent) {

                let queryGroupParams
                if (apiQueryInput && apiQueryInput.length) {

                    let queryParams = Object.values(apiQueryInput)
                        .map(e => ({
                            key: e.key
                        }))
                    queryGroupParams = wrapGroupOptions('API Query 入参', queryParams, apiQueryInput, 'key', 'label', 'in.')

                }

                let bodyGroupParams
                if (apiBodyInput && apiBodyInput.length) {
                    let outputParams = Object.values(apiBodyInput)
                        .map(e => ({
                            key: e.key
                        }))
                    bodyGroupParams = wrapGroupOptions('API Body 入参', outputParams, apiBodyInput, 'key', 'label', 'in.')
                }

                return [queryGroupParams, bodyGroupParams].filter(Boolean)

            } else if (groupType === bpmnNodeType.serviceTaskParamConversion) {

                let outputParams = []
                if (item.properties['paramConversionList']) {
                    outputParams = Object.values(item.properties['paramConversionList'])
                }

                return wrapGroupOptions(item.text.value, outputParams, [...outputParams, ...paramDefs], 'paramCode', 'paramName', `${item.id}.`)

            } else {

                let outputParams = []
                if (item.properties['outputParamList']) {
                    outputParams = Object.values(item.properties['outputParamList'])
                }

                return wrapGroupOptions(item.text.value, outputParams, [...outputParams, ...paramDefs], 'paramCode', 'paramName', `${item.id}.`)

            }

        })
        .flat()

    // item.properties["bpmn:extensionElements"]["camunda:connector"]["camunda:inputOutput"]["camunda:outputParameter"]


}

/**
 * 递归获取前序节点 Ids
 *
 * @param edges           边
 * @param targetNodeId    目标节点Id
 * @param previousNodeIds 前序节点Ids
 */
function findPrevious(edges, targetNodeId, previousNodeIds) {
    let targetNodes = edges.filter(item => targetNodeId === item.targetNodeId)

    for (const targetNode of targetNodes) {

        if (targetNode) {

            if (targetNode.sourceNodeId.includes(bpmnConst.START_EVENT_PRE)) {
                // 如果是开始节点，则跳出递归
                let startId = targetNode.sourceNodeId
                previousNodeIds.push(startId)
                return
            }

            let sourceNodeId = targetNode.sourceNodeId
            previousNodeIds.push(sourceNodeId)

            findPrevious(edges, sourceNodeId, previousNodeIds)

        }

    }

}

/**
 * 组装参数下拉分组数据
 *
 * @param groupLabel   分组标签
 * @param outputParams 参数数据
 * @param paramDefs    参数定义
 * @param keyKey       参数 key 的 key 属性
 * @param nameKey      参数 名称 的 key 属性
 * @param elPrefix     EL表达式前缀，属性所在的对象key，即所属对象：Owning object
 * @returns {{options: *, label}}
 */
function wrapGroupOptions(groupLabel, outputParams, paramDefs, keyKey, nameKey, elPrefix) {
    return {
        label: groupLabel,
        options: outputParams.map(e => {
            let label = e['key'] ?? e['paramCode']
            const paramObj = paramDefs.find(p => label === p[keyKey])
            const paramName = paramObj[nameKey] ? paramObj[nameKey] : label
            return {
                label: paramObj ? `${paramName} (${label})` : label,
                value: `\${${elPrefix}${label}}`
            }
        })
    }
}

/**
 * 解析入参、出参 json schema，转换成分组下拉框数据
 *
 * @param inputSchema
 * @param outputSchema
 * @returns {[{options: {label: *, value: string}[], label: string},{options: {label: *, value: string}[], label: string}]}
 */
export function convertSchemaToOptions(inputSchema, outputSchema) {

    const createOptions = (properties, prefix) => {
        return Object.keys(properties).map(key => {
            return {
                label: properties[key].title,
                value: `\${${prefix}.${key}}`
            }
        })
    }

    return [
        {
            label: 'API入参',
            options: createOptions(inputSchema.root.properties, 'in')
        },
        {
            label: 'API出参',
            options: createOptions(outputSchema.root.properties, 'out')
        }
    ]

}

export function getPreNodeIds(data, currentNodeId) {
    const edges = data.edges
    const nodes = data.nodes
    const previousNodeIds = []

    findPrevious(edges, currentNodeId, previousNodeIds)
    // console.log('获取前序节点出参信息', previousNodeIds)

    return previousNodeIds
}

/**
 * 获取前序节点出参信息对象树，包含 API 初始入参
 *
 * @param data
 * @param currentNodeId
 * @param paramDefs
 * @param apiQueryInputSchema
 * @param apiBodyInputSchema
 * @param schemaMap
 * @returns {*}
 */
export function getPreNodesOutputParamsTree(data, currentNodeId, paramDefs, apiQueryInputSchema, apiBodyInputSchema, schemaMap) {

    const edges = data.edges
    const nodes = data.nodes
    const previousNodeIds = []

    findPrevious(edges, currentNodeId, previousNodeIds)
    // console.log('获取前序节点出参信息', previousNodeIds)

    previousNodeIds.reverse()

    return nodes
        .filter(item => previousNodeIds.includes(item.id))
        .sort((a, b) => previousNodeIds.indexOf(a.id) - previousNodeIds.indexOf(b.id))
        .filter(item =>
            item.type === bpmnNodeType.startEvent
            || item.type === bpmnNodeType.scriptTask
            || item.type === bpmnNodeType.serviceTask
            || item.type === bpmnNodeType.serviceTaskApi
            || item.type === bpmnNodeType.serviceTaskRestful
            || item.type === bpmnNodeType.serviceTaskParamConversion
            || item.type === bpmnNodeType.serviceTaskCmdAggregation)
        .map(item => {
            const groupType = item.type
            const id = item.id


            if (groupType === bpmnNodeType.startEvent) {

                let queryGroupParamsTree
                if (apiQueryInputSchema) {
                    const queryGroupParamsChildTree = convertSchemaToTree(apiQueryInputSchema, 'in')
                    if (queryGroupParamsChildTree?.length) {
                        queryGroupParamsTree = {
                            id: 'queryIn',
                            label: 'API Query 入参',
                            disabled: true,
                            children: queryGroupParamsChildTree
                        }
                    }
                }

                let bodyGroupParamsTree
                if (apiBodyInputSchema) {
                    const bodyGroupParamsChildTree = convertSchemaToTree(apiBodyInputSchema, 'in')
                    if (bodyGroupParamsChildTree?.length) {
                        bodyGroupParamsTree = {
                            id: 'bodyIn',
                            label: 'API Body 入参',
                            disabled: true,
                            children: bodyGroupParamsChildTree
                        }
                    }
                }

                return [queryGroupParamsTree, bodyGroupParamsTree].filter(Boolean)

            } else if (groupType === bpmnNodeType.serviceTaskParamConversion) {

                let outputParams = []
                if (item.properties['paramConversionList']) {
                    outputParams = Object.values(item.properties['paramConversionList'])
                }

                let paramsChildTree = wrapTreeOptions(item.text.value, outputParams, [...outputParams, ...paramDefs], 'paramCode', 'paramName', `${item.id}.`)

                let paramsTree
                if (paramsChildTree?.options?.length) {
                    paramsTree = {
                        id: paramsChildTree.label,
                        label: paramsChildTree.label,
                        disabled: true,
                        children: paramsChildTree.options
                    }
                }

                return paramsTree

            } else if (groupType === bpmnNodeType.serviceTask
                || groupType === bpmnNodeType.serviceTaskApi
                || groupType === bpmnNodeType.serviceTaskRestful
            ) {

                // 获取原子能力对应的出参 json schema
                const schema = schemaMap.get(id)
                // 如果有 schema
                if (schema) {

                    const childTree = convertSchemaToTree(schema, id)

                    if (childTree && childTree.length) {

                        return {
                            id: item.id,
                            label: item.text.value,
                            disabled: true,
                            children: childTree
                        }

                    }

                }

            } else {

                let outputParams = []
                if (item.properties['outputParamList']) {
                    outputParams = Object.values(item.properties['outputParamList'])
                }

                let paramsChildTree = wrapTreeOptions(item.text.value, outputParams, [...outputParams, ...paramDefs], 'paramCode', 'paramName', `${item.id}.`)

                let paramsTree
                if (paramsChildTree?.options?.length) {
                    paramsTree = {
                        id: paramsChildTree.label,
                        label: paramsChildTree.label,
                        disabled: true,
                        children: paramsChildTree.options
                    }
                }

                return paramsTree

            }

        })
        .flat()
        .filter(item => item)
    /*.map(item => {

    })*/

}

/**
 * json schema 转 Tree
 *
 * @param schema
 * @param parentKey
 * @returns {*[]}
 */
function convertSchemaToTree(schema, parentKey = '') {
    let tree = []
    for (const key in schema.properties) {
        const property = schema.properties[key]
        const id = parentKey ? `${parentKey}.${key}` : key
        const node = {
            id: `\${${id}}`,
            label: property.title ? `${property.title} (${key})` : key
        }

        // If the property has nested properties, recurse
        if (property.type === 'object' && property.properties) {
            node.children = convertSchemaToTree(property, id)
        }

        tree.push(node)
    }
    return tree
}

/**
 * 组装参数下拉树数据
 *
 * @param groupLabel   分组标签
 * @param outputParams 参数数据
 * @param paramDefs    参数定义
 * @param keyKey       参数 key 的 key 属性
 * @param nameKey      参数 名称 的 key 属性
 * @param elPrefix     EL表达式前缀，属性所在的对象key，即所属对象：Owning object
 * @returns {{options: *, label}}
 */
function wrapTreeOptions(groupLabel, outputParams, paramDefs, keyKey, nameKey, elPrefix) {
    return {
        label: groupLabel,
        options: outputParams.map(e => {
            let label = e['key'] ?? e['paramCode']
            const paramObj = paramDefs.find(p => label === p[keyKey])
            const paramName = paramObj[nameKey] ? paramObj[nameKey] : label
            return {
                id: `\${${elPrefix}${label}}`,
                label: paramObj ? `${paramName} (${label})` : label
            }
        })
    }
}
