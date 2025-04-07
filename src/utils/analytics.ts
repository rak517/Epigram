/* eslint-disable @typescript-eslint/no-explicit-any */

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Google Analytics 이벤트 추적 함수
 * @param action 이벤트 액션 이름 (필수)
 * @param params 이벤트 파라미터 (선택)
 */
export const trackEvent = (action: string, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA 이벤트 추적] ${action}`, params);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log('[GA 로드되지 않음] 이벤트 추적 실패:', action, params);
  }
};

export const EpigramEvents = {
  landing: {
    /**
     * 시작하기 버튼 클릭 이벤트 추적
     */
    clickStart: () => {
      trackEvent('landing_start_click', {
        event_category: 'engagement',
        event_label: '랜딩페이지_시작하기',
      });
    },

    /**
     * 랜딩 페이지 스크롤 이벤트 추적
     * @param percentage 스크롤 퍼센트 (25, 50, 75, 100)
     */
    scroll: (percentage: 25 | 50 | 75 | 100) => {
      trackEvent('landing_scroll', {
        event_category: 'engagement',
        event_label: '랜딩페이지_스크롤',
        value: percentage,
      });
    },
  },
  auth: {
    /**
     * 로그인 완료 이벤트 추적
     * @param method 로그인 방식 ('email', 'google', 'kakao')
     */
    login: (method: 'email' | 'google' | 'kakao') => {
      trackEvent('login_complete', {
        event_category: 'conversion',
        login_method: method,
      });
    },

    /**
     * 회원가입 완료 이벤트 추적
     * @param method 회원가입 방식 ('email', 'google', 'kakao')
     */
    signup: (method: 'email' | 'google' | 'kakao') => {
      trackEvent('signup_complete', {
        event_category: 'conversion',
        signup_method: method,
      });
    },

    /**
     * 로그아웃 이벤트 추적
     */
    logout: () => {
      trackEvent('logout', {
        event_category: 'engagement',
      });
    },
  },
};

// 페이지 조회수 추적 헬퍼 함수
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
      page_path: path,
      page_title: title,
    });
  }
};
