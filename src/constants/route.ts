export const BEFORE_LOGIN_ROUTE = ['/signup', '/login'] satisfies readonly string[];
export const AFTER_LOGIN_ROUTE = ['/epigrams', '/feed', '/search', '/addepigram', '/mypage'] satisfies readonly string[];

export const EMOTION_STATUS = ['MOVED', 'HAPPY', 'SAD', 'WORRIED', 'ANGRY'] as const;
