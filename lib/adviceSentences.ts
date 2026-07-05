export interface WordItem {
  key: number;
  type: 'BLANK' | 'TEXT' | 'PUNCTUATION';
  value: string;
}

export interface SentenceItem {
  index: number;
  start: number;
  end: number;
  content: string;
  contentVi: string;
  words: WordItem[];
}

export interface AdviceData {
  title: string;
  audio_url: string;
  sentences: SentenceItem[];
}

export const adviceData: AdviceData = {
  "title": "[CAM20 - T4] Advice on family visit",
  "audio_url": "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a",
  "sentences": [
    {
      "index": 0,
      "start": 102539,
      "end": 107813,
      "content": "Sandra, I seem to remember you had some family visitors staying with you recently.",
      "contentVi": "Sandra, mình nhớ là gần đây bạn có người nhà đến chơi phải không?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Sandra"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "seem"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "remember"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "had"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "some"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "family"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "visitors"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "staying"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "with"
        },
        {
          "key": 13,
          "type": "TEXT",
          "value": "you"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "recently"
        },
        {
          "key": 15,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 1,
      "start": 108066,
      "end": 109247,
      "content": "Yeah, that's right.",
      "contentVi": "Ừ, đúng rồi đó.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Yeah"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "that's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "right"
        },
        {
          "key": 4,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 2,
      "start": 109623,
      "end": 112536,
      "content": "My brother and his family were here a couple of months ago.",
      "contentVi": "Anh trai mình và gia đình ảnh đến đây vài tháng trước.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "My"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "brother"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "his"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "family"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "were"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "here"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "couple"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "months"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "ago"
        },
        {
          "key": 12,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 3,
      "start": 112630,
      "end": 116254,
      "content": "OK, good. Well, I wanted to ask your advice.",
      "contentVi": "OK, tốt quá. Mình muốn hỏi bạn vài lời khuyên.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "OK"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "good"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 4,
          "type": "TEXT",
          "value": "Well"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "wanted"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "ask"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "your"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "advice"
        },
        {
          "key": 12,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 4,
      "start": 116654,
      "end": 124699,
      "content": "I've got my cousin and her family visiting next month and as I don't have kids, I've no idea where to take them.",
      "contentVi": "Tháng sau mình có cô em họ và gia đình của cô ấy tới chơi, mà mình thì không có con nên không biết đưa tụi nhỏ đi đâu.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I've"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "got"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "my"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "cousin"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "her"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "family"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "visiting"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "next"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "month"
        },
        {
          "key": 10,
          "type": "TEXT",
          "value": "and"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "as"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "don't"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "have"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "kids"
        },
        {
          "key": 16,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 17,
          "type": "TEXT",
          "value": "I've"
        },
        {
          "key": 18,
          "type": "BLANK",
          "value": "no"
        },
        {
          "key": 19,
          "type": "BLANK",
          "value": "idea"
        },
        {
          "key": 20,
          "type": "BLANK",
          "value": "where"
        },
        {
          "key": 21,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 22,
          "type": "BLANK",
          "value": "take"
        },
        {
          "key": 23,
          "type": "BLANK",
          "value": "them"
        },
        {
          "key": 24,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 5,
      "start": 125000,
      "end": 127202,
      "content": "Right. What about accommodation?",
      "contentVi": "À, còn chỗ ở thì sao?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Right"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "What"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "about"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "accommodation"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 6,
      "start": 127480,
      "end": 129440,
      "content": "Are they going to stay with you in your flat?",
      "contentVi": "Họ sẽ ở tại căn hộ của bạn hả?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Are"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "they"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "going"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "stay"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "with"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "in"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "your"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "flat"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 7,
      "start": 129602,
      "end": 131994,
      "content": "No, thankfully. There wouldn't be room.",
      "contentVi": "Không, may quá. Nhà mình không đủ chỗ.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "No"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "thankfully"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "There"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "wouldn't"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "be"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "room"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 8,
      "start": 132382,
      "end": 135128,
      "content": "My cousin wants me to recommend a hotel.",
      "contentVi": "Cô em họ mình muốn mình giới thiệu khách sạn.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "My"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "cousin"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "wants"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "me"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "recommend"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "hotel"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 9,
      "start": 135451,
      "end": 136468,
      "content": "Do you know anywhere?",
      "contentVi": "Bạn biết chỗ nào không?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Do"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "know"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "anywhere"
        },
        {
          "key": 4,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 10,
      "start": 136722,
      "end": 138103,
      "content": "Yes, I do actually.",
      "contentVi": "Có đấy, thực ra có.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Yes"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "actually"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 11,
      "start": 138640,
      "end": 141765,
      "content": "I always recommend people stay at the King's Hotel.",
      "contentVi": "Mình luôn giới thiệu mọi người ở King's Hotel.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "always"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "recommend"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "people"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "stay"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "at"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "King's"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "Hotel"
        },
        {
          "key": 9,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 12,
      "start": 142002,
      "end": 143090,
      "content": "Where's that near?",
      "contentVi": "Gần đâu vậy?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Where's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "near"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 13,
      "start": 143393,
      "end": 147478,
      "content": "It's about five minutes walk from Murray Station, so nice and central.",
      "contentVi": "Cách ga Murray khoảng 5 phút đi bộ, rất trung tâm luôn.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "It's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "about"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "five"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "minutes"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "walk"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "from"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "Murray"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "Station"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "so"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "nice"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "central"
        },
        {
          "key": 13,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 14,
      "start": 147949,
      "end": 149641,
      "content": "It's actually on George Street.",
      "contentVi": "Nó nằm trên phố George đó.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "It's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "actually"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "on"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "George"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "Street"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 15,
      "start": 149866,
      "end": 154425,
      "content": "Oh yes, I know. I think they're on quite a tight budget.",
      "contentVi": "À đúng rồi, mình biết. Họ chắc là muốn tiết kiệm chi phí lắm.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Oh"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "yes"
        },
        {
          "key": 2,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "know"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 6,
          "type": "TEXT",
          "value": "I"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "think"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "they're"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "on"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "quite"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "tight"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "budget"
        },
        {
          "key": 14,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 16,
      "start": 154670,
      "end": 157469,
      "content": "So how much, roughly, is it to stay there?",
      "contentVi": "Vậy giá ở đó khoảng bao nhiêu?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "So"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "how"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "much"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "roughly"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "is"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "it"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "stay"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "there"
        },
        {
          "key": 11,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 17,
      "start": 157837,
      "end": 162562,
      "content": "If you book a family room, it's about £125 per night.",
      "contentVi": "Nếu đặt phòng gia đình thì khoảng 125 bảng một đêm.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "If"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "book"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "family"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "room"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "about"
        },
        {
          "key": 9,
          "type": "PUNCTUATION",
          "value": "£"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "125"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "per"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "night"
        },
        {
          "key": 13,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 18,
      "start": 163140,
      "end": 169354,
      "content": "My brother paid for two double rooms in the end and I think that was around £95 for each room.",
      "contentVi": "Anh mình đặt hai phòng đôi, mỗi phòng khoảng 95 bảng thì phải.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "My"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "brother"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "paid"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "two"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "double"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "rooms"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "in"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "end"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "think"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "was"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "around"
        },
        {
          "key": 16,
          "type": "PUNCTUATION",
          "value": "£"
        },
        {
          "key": 17,
          "type": "BLANK",
          "value": "95"
        },
        {
          "key": 18,
          "type": "TEXT",
          "value": "for"
        },
        {
          "key": 19,
          "type": "BLANK",
          "value": "each"
        },
        {
          "key": 20,
          "type": "BLANK",
          "value": "room"
        },
        {
          "key": 21,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 19,
      "start": 169600,
      "end": 170817,
      "content": "Oh, that's not too bad.",
      "contentVi": "Ồ, cũng không đắt lắm.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Oh"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "that's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "not"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "too"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "bad"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 20,
      "start": 171109,
      "end": 173611,
      "content": "So how old are your cousin's kids?",
      "contentVi": "Vậy con của em họ bạn bao nhiêu tuổi?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "So"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "how"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "old"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "are"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "your"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "cousin's"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "kids"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 21,
      "start": 173760,
      "end": 178231,
      "content": "Twelve and nine. So I want to organise some trips while they're here.",
      "contentVi": "Mười hai và chín tuổi. Nên mình muốn lên kế hoạch mấy chuyến đi chơi.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Twelve"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "nine"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "So"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "want"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "organise"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "some"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "trips"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "while"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "they're"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "here"
        },
        {
          "key": 14,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 22,
      "start": 178868,
      "end": 184728,
      "content": "I was thinking of doing a bus tour of the city centre as none of them have been here before.",
      "contentVi": "Mình định cho cả nhà đi tour xe buýt quanh trung tâm thành phố vì chưa ai từng tới đây.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "was"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "thinking"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "doing"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "bus"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "tour"
        },
        {
          "key": 8,
          "type": "TEXT",
          "value": "of"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "city"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "centre"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "as"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "none"
        },
        {
          "key": 14,
          "type": "TEXT",
          "value": "of"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "them"
        },
        {
          "key": 16,
          "type": "BLANK",
          "value": "have"
        },
        {
          "key": 17,
          "type": "BLANK",
          "value": "been"
        },
        {
          "key": 18,
          "type": "BLANK",
          "value": "here"
        },
        {
          "key": 19,
          "type": "BLANK",
          "value": "before"
        },
        {
          "key": 20,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 23,
      "start": 185268,
      "end": 187223,
      "content": "Those bus tours are quite expensive.",
      "contentVi": "Tour xe buýt thì hơi mắc đấy.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Those"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "bus"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "tours"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "are"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "quite"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "expensive"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 24,
      "start": 187804,
      "end": 190331,
      "content": "I think it's better to do a walking tour.",
      "contentVi": "Đi tour đi bộ thì hay hơn nhiều.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "think"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "better"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "walking"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "tour"
        },
        {
          "key": 9,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 25,
      "start": 190619,
      "end": 192684,
      "content": "It gives you a much better feel for the city.",
      "contentVi": "Cảm nhận được thành phố rõ hơn.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "It"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "gives"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "much"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "better"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "feel"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "city"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 26,
      "start": 193534,
      "end": 195656,
      "content": "There's one that starts from Colton Square.",
      "contentVi": "Có tour xuất phát từ Quảng trường Colton.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "There's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "one"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "starts"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "from"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "Colton"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "Square"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 27,
      "start": 195979,
      "end": 198394,
      "content": "It takes a couple of hours and doesn't cost that much.",
      "contentVi": "Đi khoảng vài tiếng thôi mà không đắt mấy.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "It"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "takes"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "couple"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "hours"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "doesn't"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "cost"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "much"
        },
        {
          "key": 11,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 28,
      "start": 198882,
      "end": 201256,
      "content": "Sounds good. I'll look that up. Thanks.",
      "contentVi": "Nghe hay đấy. Mình sẽ tìm thông tin. Cảm ơn nha.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Sounds"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "good"
        },
        {
          "key": 2,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "I'll"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "look"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "up"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "Thanks"
        },
        {
          "key": 9,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 29,
      "start": 201440,
      "end": 205235,
      "content": "If the weather's nice, one thing you could do is visit the old fort.",
      "contentVi": "Nếu trời đẹp thì có thể đi thăm pháo đài cổ.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "If"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "weather's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "nice"
        },
        {
          "key": 4,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "one"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "thing"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "could"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "is"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "visit"
        },
        {
          "key": 12,
          "type": "TEXT",
          "value": "the"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "old"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "fort"
        },
        {
          "key": 15,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 30,
      "start": 205800,
      "end": 207149,
      "content": "You could get there by boat.",
      "contentVi": "Có thể đi thuyền đến đó.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "You"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "could"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "get"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "there"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "by"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "boat"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 31,
      "start": 207525,
      "end": 208909,
      "content": "The whole trip takes half a day.",
      "contentVi": "Chuyến đi mất nửa ngày thôi.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "The"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "whole"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "trip"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "takes"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "half"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "day"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 32,
      "start": 209220,
      "end": 211107,
      "content": "That's a really good idea.",
      "contentVi": "Ý kiến hay ghê.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "That's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "really"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "good"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "idea"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 33,
      "start": 211354,
      "end": 212844,
      "content": "I'd like to do that myself.",
      "contentVi": "Mình cũng muốn đi thử.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I'd"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "like"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "myself"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 34,
      "start": 213374,
      "end": 218154,
      "content": "And if the weather's bad, I was thinking they could go to the Science Museum.",
      "contentVi": "Còn nếu trời mưa thì mình nghĩ cho tụi nhỏ tới Bảo tàng Khoa học.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "And"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "if"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "weather's"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "bad"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "was"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "thinking"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "they"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "could"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "go"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 13,
          "type": "TEXT",
          "value": "the"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "Science"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "Museum"
        },
        {
          "key": 16,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 35,
      "start": 218734,
      "end": 221534,
      "content": "But maybe they could do that when I'm at work.",
      "contentVi": "Nhưng chắc để tụi nó đi lúc mình đi làm.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "But"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "maybe"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "they"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "could"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "when"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "I'm"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "at"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "work"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 36,
      "start": 221670,
      "end": 224361,
      "content": "Yeah, don't forget it's closed on Mondays.",
      "contentVi": "Ừ, nhớ là thứ Hai bảo tàng đóng cửa nha.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Yeah"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "don't"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "forget"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "closed"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "on"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "Mondays"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 37,
      "start": 224711,
      "end": 229988,
      "content": "They're here from Saturday for four nights, so Tuesday would be best, I think.",
      "contentVi": "Tụi nó đến từ thứ Bảy và ở bốn đêm, nên thứ Ba chắc là phù hợp nhất.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "They're"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "here"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "from"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "Saturday"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "four"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "nights"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "so"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "Tuesday"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "would"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "be"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "best"
        },
        {
          "key": 13,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "think"
        },
        {
          "key": 16,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 38,
      "start": 230230,
      "end": 232136,
      "content": "And it won't be so crowded then.",
      "contentVi": "Với lại hôm đó chắc đỡ đông hơn.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "And"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "it"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "won't"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "be"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "so"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "crowded"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "then"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 39,
      "start": 232521,
      "end": 233691,
      "content": "Saturdays are terrible.",
      "contentVi": "Thứ Bảy thì kinh lắm.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Saturdays"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "are"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "terrible"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 40,
      "start": 234257,
      "end": 238764,
      "content": "I took my kids to the exhibition on old computers there and it was far too crowded.",
      "contentVi": "Mình từng đưa con đi xem triển lãm máy tính cổ mà đông nghẹt.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "took"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "my"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "kids"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "exhibition"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "on"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "old"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "computers"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "there"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "it"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "was"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "far"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "too"
        },
        {
          "key": 16,
          "type": "BLANK",
          "value": "crowded"
        },
        {
          "key": 17,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 41,
      "start": 239383,
      "end": 241205,
      "content": "I wanted to go back but it's finished now.",
      "contentVi": "Mình định quay lại mà hết rồi.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "wanted"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "go"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "back"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "but"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "finished"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "now"
        },
        {
          "key": 9,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 42,
      "start": 241325,
      "end": 242290,
      "content": "That's a shame.",
      "contentVi": "Tiếc ghê.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "That's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "shame"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 43,
      "start": 242743,
      "end": 245099,
      "content": "My cousin's kids would have enjoyed that.",
      "contentVi": "Con của em họ mình chắc thích lắm.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "My"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "cousin's"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "kids"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "would"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "have"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "enjoyed"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 44,
      "start": 245371,
      "end": 249312,
      "content": "There's another one starting soon on Space, which looks really good too.",
      "contentVi": "Sắp tới có triển lãm về Không gian, nghe nói cũng rất hấp dẫn.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "There's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "another"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "one"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "starting"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "soon"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "on"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "Space"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "which"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "looks"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "really"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "good"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "too"
        },
        {
          "key": 13,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 45,
      "start": 249541,
      "end": 252005,
      "content": "OK, well, I'll mention that to my cousin.",
      "contentVi": "OK, mình sẽ nói với cô ấy.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "OK"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "TEXT",
          "value": "well"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "I'll"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "mention"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "my"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "cousin"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 46,
      "start": 288275,
      "end": 290717,
      "content": "Have you thought about where to take them to eat?",
      "contentVi": "Bạn đã nghĩ sẽ cho họ ăn ở đâu chưa?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Have"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "thought"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "about"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "where"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "take"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "them"
        },
        {
          "key": 8,
          "type": "TEXT",
          "value": "to"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "eat"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 47,
      "start": 291368,
      "end": 295576,
      "content": "Well, I really like all the food stalls at Clacton Market.",
      "contentVi": "Mình rất thích các quầy đồ ăn ở Chợ Clacton.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Well"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "really"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "like"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "all"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "food"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "stalls"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "at"
        },
        {
          "key": 10,
          "type": "TEXT",
          "value": "Clacton"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "Market"
        },
        {
          "key": 12,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 48,
      "start": 295921,
      "end": 297754,
      "content": "My cousin's vegetarian.",
      "contentVi": "Em họ mình ăn chay.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "My"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "cousin's"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "vegetarian"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 49,
      "start": 298035,
      "end": 300977,
      "content": "I know it's one of the best places for that kind of food.",
      "contentVi": "Mình biết đây là một trong những nơi tốt nhất cho đồ chay.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "know"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "one"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "best"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "places"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "kind"
        },
        {
          "key": 11,
          "type": "TEXT",
          "value": "of"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "food"
        },
        {
          "key": 13,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 50,
      "start": 301253,
      "end": 304592,
      "content": "Definitely. And there'll be loads of choice for the kids too.",
      "contentVi": "Đúng vậy. Mà tụi nhỏ cũng có nhiều lựa chọn.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Definitely"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "And"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "there'll"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "be"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "loads"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "choice"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "kids"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "too"
        },
        {
          "key": 12,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 51,
      "start": 305030,
      "end": 307110,
      "content": "You need to get there quite early though.",
      "contentVi": "Phải tới sớm chút nha.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "You"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "need"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "get"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "there"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "quite"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "early"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "though"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 52,
      "start": 307179,
      "end": 310980,
      "content": "At the weekend, most of the stalls stop serving lunch at 2.30.",
      "contentVi": "Cuối tuần thì mấy quầy ngừng bán trưa lúc 2:30.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "At"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "weekend"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "most"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 6,
          "type": "TEXT",
          "value": "the"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "stalls"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "stop"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "serving"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "lunch"
        },
        {
          "key": 11,
          "type": "TEXT",
          "value": "at"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "2.30"
        },
        {
          "key": 13,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 53,
      "start": 311090,
      "end": 314459,
      "content": "Good point. It's all going to need careful planning.",
      "contentVi": "Ờ, tốt nhắc mới nhớ. Phải lên kế hoạch kỹ càng mới được.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Good"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "point"
        },
        {
          "key": 2,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "It's"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "all"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "going"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "need"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "careful"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "planning"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 54,
      "start": 314951,
      "end": 321327,
      "content": "My cousin said she'd love to take the kids to a show at the theatre, but tickets are so expensive.",
      "contentVi": "Em họ mình bảo rất muốn cho tụi nhỏ đi xem kịch nhưng vé thì mắc quá.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "My"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "cousin"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "said"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "she'd"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "love"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "take"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "kids"
        },
        {
          "key": 9,
          "type": "TEXT",
          "value": "to"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "show"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "at"
        },
        {
          "key": 13,
          "type": "TEXT",
          "value": "the"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "theatre"
        },
        {
          "key": 15,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 16,
          "type": "BLANK",
          "value": "but"
        },
        {
          "key": 17,
          "type": "BLANK",
          "value": "tickets"
        },
        {
          "key": 18,
          "type": "BLANK",
          "value": "are"
        },
        {
          "key": 19,
          "type": "BLANK",
          "value": "so"
        },
        {
          "key": 20,
          "type": "BLANK",
          "value": "expensive"
        },
        {
          "key": 21,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 55,
      "start": 321537,
      "end": 328302,
      "content": "I know. But you can get some good deals if you book online with bargain-tickets.com for the following day.",
      "contentVi": "Mình biết. Nhưng nếu đặt trên bargain-tickets.com cho ngày hôm sau thì sẽ có vé rẻ.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "know"
        },
        {
          "key": 2,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "But"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "can"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "get"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "some"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "good"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "deals"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "if"
        },
        {
          "key": 11,
          "type": "TEXT",
          "value": "you"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "book"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "online"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "with"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "bargain"
        },
        {
          "key": 16,
          "type": "PUNCTUATION",
          "value": "-"
        },
        {
          "key": 17,
          "type": "BLANK",
          "value": "tickets"
        },
        {
          "key": 18,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 19,
          "type": "BLANK",
          "value": "com"
        },
        {
          "key": 20,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 21,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 22,
          "type": "BLANK",
          "value": "following"
        },
        {
          "key": 23,
          "type": "BLANK",
          "value": "day"
        },
        {
          "key": 24,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 56,
      "start": 328890,
      "end": 331712,
      "content": "On some seats there's a 75% discount.",
      "contentVi": "Một số chỗ được giảm giá tới 75%.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "On"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "some"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "seats"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "there's"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "75"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "%"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "discount"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 57,
      "start": 331878,
      "end": 334568,
      "content": "Really? I must try and get some.",
      "contentVi": "Thật hả? Mình phải đặt thử mới được.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Really"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": "?"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "I"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "must"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "try"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "get"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "some"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 58,
      "start": 334700,
      "end": 337934,
      "content": "Yeah. There are lots of things you can do for free as well.",
      "contentVi": "Ừ. Cũng có nhiều chỗ chơi miễn phí nữa mà.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Yeah"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": "."
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "There"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "are"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "lots"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "things"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "you"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "can"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 11,
          "type": "BLANK",
          "value": "free"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "as"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "well"
        },
        {
          "key": 14,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 59,
      "start": 338240,
      "end": 339682,
      "content": "No need to spend a fortune.",
      "contentVi": "Không cần tốn nhiều tiền đâu.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "No"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "need"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "spend"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "fortune"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 60,
      "start": 339869,
      "end": 340542,
      "content": "Like what?",
      "contentVi": "Ví dụ?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Like"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "what"
        },
        {
          "key": 2,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 61,
      "start": 341146,
      "end": 342817,
      "content": "They're coming next month, right?",
      "contentVi": "Họ đến tháng sau đúng không?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "They're"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "coming"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "next"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "month"
        },
        {
          "key": 4,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "right"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 62,
      "start": 342930,
      "end": 348903,
      "content": "Well, check and see if it's the same weekend as the Roots Music Festival in Blakewell Gardens.",
      "contentVi": "Vậy kiểm tra thử xem có trùng với Lễ hội Nhạc Roots ở Công viên Blakewell không?",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Well"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "check"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "see"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "if"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "same"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "weekend"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "as"
        },
        {
          "key": 11,
          "type": "TEXT",
          "value": "the"
        },
        {
          "key": 12,
          "type": "BLANK",
          "value": "Roots"
        },
        {
          "key": 13,
          "type": "BLANK",
          "value": "Music"
        },
        {
          "key": 14,
          "type": "BLANK",
          "value": "Festival"
        },
        {
          "key": 15,
          "type": "BLANK",
          "value": "in"
        },
        {
          "key": 16,
          "type": "BLANK",
          "value": "Blakewell"
        },
        {
          "key": 17,
          "type": "BLANK",
          "value": "Gardens"
        },
        {
          "key": 18,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 63,
      "start": 349401,
      "end": 351896,
      "content": "R-O-O-T-S?",
      "contentVi": "R-O-O-T-S?",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "R"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": "-"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "O"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "-"
        },
        {
          "key": 4,
          "type": "TEXT",
          "value": "O"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "-"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "T"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "-"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "S"
        },
        {
          "key": 9,
          "type": "PUNCTUATION",
          "value": "?"
        }
      ]
    },
    {
      "index": 64,
      "start": 352308,
      "end": 353866,
      "content": "Yeah, check it out online.",
      "contentVi": "Đúng, tìm online thử đi.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Yeah"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "check"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "it"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "out"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "online"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 65,
      "start": 354358,
      "end": 357534,
      "content": "It's always a family-friendly event and there's no entry charge.",
      "contentVi": "Sự kiện này rất thân thiện với gia đình và không mất vé vào cửa.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "It's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "always"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "a"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "family-friendly"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "event"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "and"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "there's"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "no"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "entry"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "charge"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 66,
      "start": 357801,
      "end": 358951,
      "content": "That sounds perfect.",
      "contentVi": "Nghe hợp lý ghê.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "That"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "sounds"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "perfect"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 67,
      "start": 359247,
      "end": 362788,
      "content": "And if you're in Blakewell Gardens, climb Telegraph Hill.",
      "contentVi": "Nếu đã ở Công viên Blakewell thì leo đồi Telegraph luôn đi.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "And"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "if"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "you're"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "in"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "Blakewell"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "Gardens"
        },
        {
          "key": 6,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "climb"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "Telegraph"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "Hill"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 68,
      "start": 363247,
      "end": 365478,
      "content": "You'll be able to look right down on the port.",
      "contentVi": "Bạn sẽ nhìn thấy toàn cảng ở phía dưới.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "You'll"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "be"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "able"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "look"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "right"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "down"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "on"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "port"
        },
        {
          "key": 10,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 69,
      "start": 366198,
      "end": 368675,
      "content": "Everyone's always really impressed because it's so huge.",
      "contentVi": "Ai cũng ấn tượng vì nó to lắm.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Everyone's"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "always"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "really"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "impressed"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "because"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "so"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "huge"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 70,
      "start": 368838,
      "end": 372350,
      "content": "Oh yeah, I've been meaning to do that for ages.",
      "contentVi": "Ờ, mình định làm việc đó lâu rồi mà chưa có dịp.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Oh"
        },
        {
          "key": 1,
          "type": "TEXT",
          "value": "yeah"
        },
        {
          "key": 2,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "I've"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "been"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "meaning"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "to"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "do"
        },
        {
          "key": 8,
          "type": "BLANK",
          "value": "that"
        },
        {
          "key": 9,
          "type": "BLANK",
          "value": "for"
        },
        {
          "key": 10,
          "type": "BLANK",
          "value": "ages"
        },
        {
          "key": 11,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 71,
      "start": 372440,
      "end": 374094,
      "content": "I've heard the view's amazing.",
      "contentVi": "Nghe nói cảnh đẹp lắm.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "I've"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "heard"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "view's"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "amazing"
        },
        {
          "key": 5,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 72,
      "start": 374337,
      "end": 376177,
      "content": "Yeah, it's really worth the effort.",
      "contentVi": "Đúng vậy, rất đáng để thử.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Yeah"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "it's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "really"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "worth"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "the"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "effort"
        },
        {
          "key": 7,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 73,
      "start": 377238,
      "end": 379526,
      "content": "Well, that's given me loads of ideas.",
      "contentVi": "Bạn đã cho mình nhiều ý tưởng quá chừng.",
      "words": [
        {
          "key": 0,
          "type": "TEXT",
          "value": "Well"
        },
        {
          "key": 1,
          "type": "PUNCTUATION",
          "value": ","
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "that's"
        },
        {
          "key": 3,
          "type": "BLANK",
          "value": "given"
        },
        {
          "key": 4,
          "type": "BLANK",
          "value": "me"
        },
        {
          "key": 5,
          "type": "BLANK",
          "value": "loads"
        },
        {
          "key": 6,
          "type": "BLANK",
          "value": "of"
        },
        {
          "key": 7,
          "type": "BLANK",
          "value": "ideas"
        },
        {
          "key": 8,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    },
    {
      "index": 74,
      "start": 379610,
      "end": 380654,
      "content": "Thanks so much.",
      "contentVi": "Cảm ơn nhiều nha.",
      "words": [
        {
          "key": 0,
          "type": "BLANK",
          "value": "Thanks"
        },
        {
          "key": 1,
          "type": "BLANK",
          "value": "so"
        },
        {
          "key": 2,
          "type": "BLANK",
          "value": "much"
        },
        {
          "key": 3,
          "type": "PUNCTUATION",
          "value": "."
        }
      ]
    }
  ]
};
