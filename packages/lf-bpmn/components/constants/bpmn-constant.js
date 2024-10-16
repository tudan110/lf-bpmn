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
    userTask: 'bpmn:userTask',
    serviceTask: 'bpmn:serviceTask',
    serviceTaskRestful: 'bpmn:serviceTask-restful',
    scriptTask: 'bpmn:scriptTask',
    subProcess: 'bpmn:subProcess',
    parallelGateway: 'bpmn:parallelGateway',
    exclusiveGateway: 'bpmn:exclusiveGateway',
    intermediateCatchEvent: 'bpmn:intermediateCatchEvent',
}

/**
 * 流程相关常量
 * @type {{END_EVENT_PRE: string, ABILITY_ID_SYMBOL: string, START_EVENT_PRE: string, SERVICE_TASK_PRE: string}}
 */
export const bpmnConst = {
    START_EVENT_PRE: 'startEvent_',
    SERVICE_TASK_PRE: 'serviceTask_',
    SERVICE_TASK_RESTFUL_PRE: 'serviceTask_restful_',
    SERVICE_TASK_PARAM_CONVERSION_PRE: 'serviceTask_param_conversion_',
    SERVICE_TASK_CMD_AGGREGATION_PRE: 'serviceTask_cmd-aggregation_',
    SCRIPT_TASK_PRE: 'scriptTask_',
    END_EVENT_PRE: 'endEvent_',
    ABILITY_ID_SYMBOL: '_abilityId_',
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

