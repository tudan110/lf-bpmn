/**
 * bpmn 节点类型
 *
 * @type {{
 *          scriptTask: string,
 *          subProcess: string,
 *          endEvent: string,
 *          mtQuery: string,
 *          serviceTask: string,
 *          mtCompare: string,
 *          startEvent: string,
 *          mtJoin: string,
 *          mtLoad: string,
 *          mtConnect: string,
 *          mtExtract: string
 *        }}
 */
export const bpmnNodeType = {
    incoming: 'bpmn:incoming',
    outgoing: 'bpmn:outgoing',
    startEvent: 'bpmn:startEvent',
    endEvent: 'bpmn:endEvent',
    intermediateCatchEvent: 'bpmn:intermediateCatchEvent',
    parallelGateway: 'bpmn:parallelGateway',
    exclusiveGateway: 'bpmn:exclusiveGateway',
    subProcess: 'bpmn:subProcess',
    userTask: 'bpmn:userTask',
    serviceTask: 'bpmn:serviceTask',
    scriptTask: 'bpmn:scriptTask',
    sendTask: 'bpmn:sendTask',
    serviceTaskRestful: 'bpmn:serviceTask-restful',
}

/**
 * 流程相关常量
 * @type {{END_EVENT_PRE: string, ABILITY_ID_SYMBOL: string, START_EVENT_PRE: string, SERVICE_TASK_PRE: string}}
 */
export const bpmnConst = {
    START_EVENT_PRE: 'startEvent_',
    END_EVENT_PRE: 'endEvent_',
    SERVICE_TASK_PRE: 'serviceTask_',
    SCRIPT_TASK_PRE: 'scriptTask_',
    SEND_TASK_PRE: 'sendTask_',
    SERVICE_TASK_RESTFUL_PRE: 'serviceTask_restful_',
}

export const StartEventConfig = {
    width: 40,
    height: 40,
}

export const EndEventConfig = {
    width: 40,
    height: 40,
}

export const ExclusiveGatewayConfig = {
    width: 40,
    height: 40,
}

export const ServiceTaskConfig = {
    width: 100,
    height: 80,
}

export const UserTaskConfig = {
    width: 100,
    height: 80,
}

