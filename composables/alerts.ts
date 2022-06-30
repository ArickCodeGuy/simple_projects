export interface Alert {
    text: string;
    type?: 'warn' | 'error' | 'success';
}
const ALERT_LIFE_TIME = 5000

export const useAlerts = () => useState<Alert[]>('Alerts', () => [])

export const pushAlert = (alert: Alert) : void => {
    useAlerts().value.push(alert)
    setTimeout(() => {
        useAlerts().value.splice(0, 1)
    }, ALERT_LIFE_TIME)
}