// Type Imports
import type { FarmOverview } from '@/types/dashboards/users-types'

/** Deterministic 24 h temperature curve: steady by day, a night set-back in the middle. */
const climateTrend = (dayTemp: number, nightDrop: number, seed: number) =>
  Array.from({ length: 48 }, (_, index) => {
    const isNight = index >= 23 && index <= 38
    const noise = Math.sin(index * 1.7 + seed) * 0.35 + Math.cos(index * 0.6 + seed) * 0.25

    return Number(((isNight ? dayTemp - nightDrop : dayTemp) + noise).toFixed(2))
  })

export const farmOverview: FarmOverview = {
  greetingName: 'Ines',
  pickerShortfallInWeeks: 3,

  season: {
    toDateTonnes: 106.0,
    changePercent: 1.9,
    thisWeekKg: 5622,
    daysElapsed: 3,
    areaM2: 41000,
    weeks: [
      { week: 'W31', current: 8.6, previous: 7.9 },
      { week: 'W32', current: 10.4, previous: 9.2 },
      { week: 'W33', current: 10.9, previous: 10.3 },
      { week: 'W34', current: 8.2, previous: 9.6 },
      { week: 'W35', current: 4.8, previous: 7.0 },
      { week: 'W36', current: 2.9, previous: 4.6 },
      { week: 'W37', current: 3.6, previous: 3.5 },
      { week: 'W38', current: 6.5, previous: 4.3 },
      { week: 'W39', current: 8.8, previous: 7.4 },
      { week: 'W40', current: 7.4, previous: 8.6 },
      { week: 'W41', current: 5.2, previous: 7.1 },
      { week: 'W42', current: 5.4, previous: 5.8 },
      { week: 'W43', current: 9.8, previous: 7.3 },
      { week: 'W44', current: 13.5, previous: 11.4 }
    ]
  },

  today: {
    pickersOnShift: 36,
    shiftStart: '06:15',
    plannedKg: 2250,
    byHouse: [
      { houseId: 'ashby', kg: 1098 },
      { houseId: 'dunmore', kg: 222 }
    ],
    class1Percent: 87,
    punnets: 2872,
    lastHourKg: [37.3, 34, 7.2, 12.9, 8.1, 0, 0, 0, 0, 0, 0, 11.2]
  },

  houses: [
    {
      id: 'ashby',
      no: 1,
      name: 'Ashby',
      crop: 'Strawberry',
      variety: 'Favori',
      phase: 'pick',
      climate: { temperature: 20.0, humidity: 77, co2: 820, lightsOn: true, trend: climateTrend(20.2, 5.4, 1) },
      harvest: { pickedKg: 1098, targetKg: 1850, crews: ['Crew A', 'Crew B', 'Crew C'] }
    },
    {
      id: 'bramley',
      no: 2,
      name: 'Bramley',
      crop: 'Strawberry',
      variety: 'Malling Centenary',
      phase: 'establish',
      climate: { temperature: 17.7, humidity: 81, co2: 640, lightsOn: true, trend: climateTrend(17.9, 4.6, 2) },
      nextMilestone: 'Establish · 5 days left'
    },
    {
      id: 'cotes',
      no: 3,
      name: 'Cotes',
      crop: 'Strawberry',
      variety: 'Favori',
      phase: 'flower',
      climate: { temperature: 20.6, humidity: 74, co2: 790, lightsOn: true, trend: climateTrend(20.8, 5.1, 3) },
      nextMilestone: 'First pick in 5 days'
    },
    {
      id: 'dunmore',
      no: 4,
      name: 'Dunmore',
      crop: 'Raspberry',
      variety: 'Maravilla',
      phase: 'pick',
      climate: { temperature: 17.9, humidity: 68, co2: 560, lightsOn: false, trend: climateTrend(18.1, 4.8, 4) },
      harvest: { pickedKg: 222, targetKg: 400, crews: ['Crew D'] }
    }
  ],

  cycles: [
    {
      houseId: 'ashby',
      elapsedDays: 89,
      startLabel: 'Sat 8 Aug',
      endLabel: 'Fri 1 Jan',
      statusLabel: 'Picking · day 40 of 98',
      phases: [
        { phase: 'plant', days: 3, range: 'Sat 8 Aug – Mon 10 Aug' },
        { phase: 'establish', days: 24, range: 'Tue 11 Aug – Thu 3 Sept' },
        { phase: 'flower', days: 22, range: 'Fri 4 Sept – Fri 25 Sept' },
        { phase: 'pick', days: 98, range: 'Sat 26 Sept – Fri 1 Jan' }
      ]
    },
    {
      houseId: 'bramley',
      elapsedDays: 32,
      startLabel: 'Sun 4 Oct',
      endLabel: 'Sat 3 Apr',
      statusLabel: 'Establish · 5 days left',
      phases: [
        { phase: 'plant', days: 4, range: 'Sun 4 Oct – Wed 7 Oct' },
        { phase: 'establish', days: 32, range: 'Thu 8 Oct – Sun 8 Nov' },
        { phase: 'flower', days: 24, range: 'Mon 9 Nov – Wed 2 Dec' },
        { phase: 'pick', days: 122, range: 'Thu 3 Dec – Sat 3 Apr' }
      ]
    },
    {
      houseId: 'cotes',
      elapsedDays: 59,
      startLabel: 'Mon 7 Sept',
      endLabel: 'Mon 22 Feb',
      statusLabel: 'First pick in 5 days',
      phases: [
        { phase: 'plant', days: 3, range: 'Mon 7 Sept – Wed 9 Sept' },
        { phase: 'establish', days: 26, range: 'Thu 10 Sept – Mon 5 Oct' },
        { phase: 'flower', days: 34, range: 'Tue 6 Oct – Sun 8 Nov' },
        { phase: 'pick', days: 106, range: 'Mon 9 Nov – Mon 22 Feb' }
      ]
    },
    {
      houseId: 'dunmore',
      elapsedDays: 101,
      startLabel: 'Mon 27 Jul',
      endLabel: 'Wed 16 Dec',
      statusLabel: 'Picking · day 38 of 80',
      phases: [
        { phase: 'plant', days: 6, range: 'Mon 27 Jul – Sat 1 Aug' },
        { phase: 'establish', days: 29, range: 'Sun 2 Aug – Sun 30 Aug' },
        { phase: 'flower', days: 28, range: 'Mon 31 Aug – Sun 27 Sept' },
        { phase: 'pick', days: 80, range: 'Mon 28 Sept – Wed 16 Dec' }
      ]
    }
  ],

  traps: [
    {
      houseId: 'ashby',
      counts: [
        { pest: 'Thrips', count: 14, limit: 25 },
        { pest: 'Aphids', count: 3, limit: 10 },
        { pest: 'Spider mite', count: 6, limit: 5 }
      ]
    },
    {
      houseId: 'bramley',
      counts: [
        { pest: 'Thrips', count: 31, limit: 25 },
        { pest: 'Aphids', count: 5, limit: 10 },
        { pest: 'Spider mite', count: 1, limit: 5 }
      ]
    },
    {
      houseId: 'cotes',
      counts: [
        { pest: 'Thrips', count: 9, limit: 25 },
        { pest: 'Aphids', count: 12, limit: 10 },
        { pest: 'Spider mite', count: 0, limit: 5 }
      ]
    },
    {
      houseId: 'dunmore',
      counts: [
        { pest: 'Thrips', count: 6, limit: 25 },
        { pest: 'Aphids', count: 2, limit: 10 },
        { pest: 'Spider mite', count: 2, limit: 5 }
      ]
    }
  ],

  orders: [
    { id: 'WF-3318', customer: 'Harlow & Pine', trays: 180, value: 3042, stage: 'Packed' },
    { id: 'WF-3319', customer: 'Marlbrook Co-op', trays: 110, value: 2152, stage: 'Picking' },
    { id: 'WF-3320', customer: 'The Larder at Wyebank', trays: 10, value: 185.2, stage: 'New' }
  ],

  tasks: [
    {
      id: 'task-1',
      title: 'Calibrate the EC sensor',
      houseId: 'cotes',
      due: '11:30',
      assignee: { name: 'Owen Price', initials: 'OP' },
      done: false
    },
    {
      id: 'task-2',
      title: 'Blue sticky traps — Bramley',
      houseId: 'bramley',
      due: '12:00',
      assignee: { name: 'Sunita Rao', initials: 'SR' },
      done: false
    },
    {
      id: 'task-3',
      title: 'Brix sampling, 30 fruit per house',
      due: '13:00',
      assignee: { name: 'Hana Sato', initials: 'HS' },
      done: false
    },
    {
      id: 'task-4',
      title: 'Release Phytoseiulus in bays 4–6',
      houseId: 'ashby',
      due: '15:00',
      assignee: { name: 'Sunita Rao', initials: 'SR' },
      done: false
    },
    {
      id: 'task-5',
      title: 'Order 20,000 × 400 g punnets',
      due: '17:00',
      assignee: { name: 'Lucía Fernández', initials: 'LF' },
      done: false
    }
  ],

  activity: [
    { id: 'act-1', kind: 'harvest', message: 'Crew A logged 31.4 kg from Ashby bay 5', time: '1 h ago', actor: 'Anya' },
    { id: 'act-2', kind: 'climate', message: 'Bramley climate: vents opened to 4%', time: '2 h ago', actor: 'Owen' },
    {
      id: 'act-3',
      kind: 'dispatch',
      message: 'WF-3318 for Harlow & Pine packed — 180 trays',
      time: '2 h ago',
      actor: 'Lucía'
    },
    { id: 'act-4', kind: 'pest', message: 'Thrips count in Bramley: 31 per trap', time: '3 h ago', actor: 'Sunita' },
    {
      id: 'act-5',
      kind: 'lighting',
      message: 'Ashby lights stepped down to 70% as the sun came up',
      time: '3 h ago',
      actor: 'Owen'
    },
    {
      id: 'act-6',
      kind: 'staff',
      message: 'Pickers on shift: 26 in Ashby, 6 in Dunmore',
      time: '5 h ago',
      actor: 'Marek'
    }
  ]
}
