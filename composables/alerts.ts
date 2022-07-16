import { v4 as uuidv4 } from 'uuid';

export type AlertType = 'warn' | 'error' | 'success' | undefined
export interface Alert {
    id: string;
    text: string;
    time: number;
    type?: AlertType;
}
const ALERT_LIFE_TIME = 5000

export const useAlerts = () => useState<Alert[]>('Alerts', () => [])

export const pushAlert = (alert: {text: string, type?: AlertType, time?: number}) : void => {
    const id = uuidv4()
    const time = alert.time || ALERT_LIFE_TIME

    useAlerts().value.push({id, time, ...alert})
    setTimeout(() => {
        removeAlert(id)
    }, time)
}

export const removeAlert = (alert_id: string) : boolean => {
    const alerts = useAlerts().value
    const alert_index = alerts.findIndex(i => i.id === alert_id)
    if (alert_index === -1) return false

    alerts.splice(alert_index, 1)
    return true
}