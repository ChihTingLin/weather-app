export const locations: string[] = [
  "嘉義縣",
  "新北市",
  "嘉義市",
  "新竹縣",
  "新竹市",
  "臺北市",
  "臺南市",
  "宜蘭縣",
  "苗栗縣",
  "雲林縣",
  "花蓮縣",
  "臺中市",
  "臺東縣",
  "桃園市",
  "南投縣",
  "高雄市",
  "金門縣",
  "屏東縣",
  "基隆市",
  "澎湖縣",
  "彰化縣",
  "連江縣"
]

export const cities = [
  {
      "city": "嘉義縣",
      "weekData": "F-D0047-031",
      "daysData": "F-D0047-029"
  },
  {
      "city": "新北市",
      "weekData": "F-D0047-071",
      "daysData": "F-D0047-069"
  },
  {
      "city": "嘉義市",
      "weekData": "F-D0047-059",
      "daysData": "F-D0047-057"
  },
  {
      "city": "新竹縣",
      "weekData": "F-D0047-011",
      "daysData": "F-D0047-009"
  },
  {
      "city": "新竹市",
      "weekData": "F-D0047-055",
      "daysData": "F-D0047-053"
  },
  {
      "city": "臺北市",
      "weekData": "F-D0047-063",
      "daysData": "F-D0047-061"
  },
  {
      "city": "臺南市",
      "weekData": "F-D0047-079",
      "daysData": "F-D0047-077"
  },
  {
      "city": "宜蘭縣",
      "weekData": "F-D0047-003",
      "daysData": "F-D0047-001"
  },
  {
      "city": "苗栗縣",
      "weekData": "F-D0047-015",
      "daysData": "F-D0047-013"
  },
  {
      "city": "雲林縣",
      "weekData": "F-D0047-027",
      "daysData": "F-D0047-025"
  },
  {
      "city": "花蓮縣",
      "weekData": "F-D0047-043",
      "daysData": "F-D0047-041"
  },
  {
      "city": "臺中市",
      "weekData": "F-D0047-075",
      "daysData": "F-D0047-073"
  },
  {
      "city": "臺東縣",
      "weekData": "F-D0047-039",
      "daysData": "F-D0047-037"
  },
  {
      "city": "桃園市",
      "weekData": "F-D0047-007",
      "daysData": "F-D0047-005"
  },
  {
      "city": "南投縣",
      "weekData": "F-D0047-023",
      "daysData": "F-D0047-021"
  },
  {
      "city": "高雄市",
      "weekData": "F-D0047-067",
      "daysData": "F-D0047-065"
  },
  {
      "city": "金門縣",
      "weekData": "F-D0047-087",
      "daysData": "F-D0047-085"
  },
  {
      "city": "屏東縣",
      "weekData": "F-D0047-035",
      "daysData": "F-D0047-033"
  },
  {
      "city": "基隆市",
      "weekData": "F-D0047-051",
      "daysData": "F-D0047-049"
  },
  {
      "city": "澎湖縣",
      "weekData": "F-D0047-049",
      "daysData": "F-D0047-047"
  },
  {
      "city": "彰化縣",
      "weekData": "F-D0047-019",
      "daysData": "F-D0047-017"
  },
  {
      "city": "連江縣",
      "weekData": "F-D0047-083",
      "daysData": "F-D0047-081"
  }
]

export const weatherElements: {
  [key: string]: {
    value: string
    label: string
    unit?: string
  }
} = {
  "Wx": {
    "value": "Wx",
    "label": "天氣現象"
  },
  "PoP": {
    "value": "PoP",
    "label": "降雨機率",
    "unit": "%"
  },
  "CI": {
    "value": "CI",
    "label": "舒適度"
  },
  "MinT": {
    "value": "MinT",
    "label": "最低溫度",
    "unit": "°C"
  },
  "MaxT": {
    "value": "MaxT",
    "label": "最高溫度",
    "unit": "°C"
  }
}