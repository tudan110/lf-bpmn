import * as _BPMNAdaper from '@logicflow/extension/es/bpmn-adapter/index'
import {getBpmnId} from '@logicflow/extension/es/bpmn-adapter/bpmnIds'
import {bpmnNodeType} from '../constants/bpmn-constant'

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
            || node.type === bpmnNodeType.subProcess) {
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
