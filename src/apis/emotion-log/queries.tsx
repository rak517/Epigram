import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMonthlyEmotionLogs, getTodayEmotionLog, postTodayEmotionLog } from "."
import { Emotion, MonthlyEmotionLogsProps } from "./types"

export const useGetTodayEmotionLog = (userId : number) => {
    return useQuery({
        queryKey : [ 'todayEmotionLog' ,userId ],
        queryFn :  () => getTodayEmotionLog(userId),
        enabled : !!userId,
    })
}

export const usePostTodayEmotionLog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : (emotions : Emotion) => {
            return postTodayEmotionLog({emotions})
        },
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ['todayEmotionLog']})
        }
    })
}

export const useGetMonthlyEmotionLogs = ({userId, year, month} : MonthlyEmotionLogsProps) => {
    return useQuery({
        queryKey : ['month', userId],
        queryFn : () => getMonthlyEmotionLogs({userId, year, month}),
        enabled : !!userId && !!year && !!month
    })
}