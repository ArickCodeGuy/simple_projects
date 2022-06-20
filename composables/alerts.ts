interface Alert {
    text: string;
    type: 'warn' | 'error' | 'neutral';
}
const ALERT_LIFE_TIME = 5000
export const useAlerts = () => useState<Alert[]>('alerts', () => [])

export const pushAlert = (alert: alert) : void => {
    useAlerts().value.push(alert)
    setTimeout(() => {
        useAlerts().value.splice(0, 1)
    }, ALERT_LIFE_TIME)
}