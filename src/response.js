// response.js
export const RESP = {
    COMMERCIALS: {
      ok: true,
      result: [
        {
          title: "신전떡볶이",
          content: "카레가루가 섞여서 맛있당! JMT!",
          image: "http://ui.ssgcdn.com/cmpt/banner/202103/2021032509540448772796294379_265.jpg",
        },
        {
          title: "신전떡볶이",
          content: "카레가루가 섞여서 맛있당! JMT!",
          image: "http://ui.ssgcdn.com/cmpt/banner/202103/2021032509540448772796294379_265.jpg",
        },
      ],
    },
    DETAIL: {
      ok: true,
      result: [
        {
          title: "신전떡볶이",
          content: "카레가루가 섞여서 맛있당! JMT!",
          image: "http://ui.ssgcdn.com/cmpt/banner/202103/2021032509540448772796294379_265.jpg",
          createdAt: '0000-00-00-0000',   
        },
      ],
    },
    LOGIN: {
      ok: true,
      result: {
        user: {
          token: "eyJ0eXAi...",
          name: "김항해",
        },
      },
    },
    ITEM_DETAIL: {
      ok: true,
      result: {
        price: 200,
        name: "",
        sections: {
          detail: {
            modelNo: "1000032249707",
          },
          imgs: [
            "http://gi.esmplus.com/dodomae/NAR/Monami/pluspen3000.jpg",
            "http://ai.esmplus.com/officetop/PIL.jpg",
          ],
          requireds: {
            modelName: "3000 플러스펜 낱개",
          },
          reviews: [
            {
              star: 5,
              comment: "필기감이 좋고 가성비 최고",
              item: "[구매옵션] 색상: 보라색",
              userid: "jgs*******",
              createdAt: "2021-03-31T19:01:56.791388+09:00",
            },
          ],
        },
      },
    },
  };
