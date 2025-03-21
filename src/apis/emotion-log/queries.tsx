import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMonthlyEmotionLogs, getTodayEmotionLog, postTodayEmotionLog } from "."
import { EmotionRequset,  GetMonthlyEmotionLogs } from "./types"
import { User } from "../user/types"

export const useGetTodayEmotionLog = (userId : User['id']) => {
    return useQuery({
        queryKey : [ 'todayEmotionLog' ,userId ],
        queryFn :  () => getTodayEmotionLog(userId),
    })
}

export const usePostTodayEmotionLog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : (params : EmotionRequset) => {
            return postTodayEmotionLog(params)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ['todayEmotionLog']})
        }
    })
}

export const useGetMonthlyEmotionLogs = (params : GetMonthlyEmotionLogs) => {
    return useQuery({
        queryKey : ['month', params],
        queryFn : () => getMonthlyEmotionLogs(params),
    })
}