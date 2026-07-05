export const KHTN7_CHAPTER2_BLUEPRINTS = [
  {
    conceptSlug: 'khtn7-don-chat-hop-chat',
    blueprintId: 'khtn7-ch2-bp-001',
    description: 'Phân loại chất là đơn chất hay hợp chất',
    template: 'multiple-choice',
    difficulty: 1.0,
    generator: () => {
      const substances = [
        { name: 'Khí Oxygen', formula: 'O2', type: 'Đơn chất' },
        { name: 'Nước', formula: 'H2O', type: 'Hợp chất' },
        { name: 'Khí Helium', formula: 'He', type: 'Đơn chất' },
        { name: 'Muối ăn', formula: 'NaCl', type: 'Hợp chất' },
        { name: 'Khí Carbon dioxide', formula: 'CO2', type: 'Hợp chất' }
      ];
      
      const target = substances[Math.floor(Math.random() * substances.length)];
      const otherTypes = substances.filter(s => s.type !== target.type);
      const distractors = otherTypes.slice(0, 3).map(s => s.type);
      
      return {
        question: `Chất ${target.name} (${target.formula}) thuộc loại nào?`,
        options: [target.type, ...distractors].sort(() => Math.random() - 0.5),
        correctAnswer: target.type,
        explanation: `${target.name} được tạo thành từ ${target.type === 'Đơn chất' ? 'một' : 'hai'} loại nguyên tố hoá học.`
      };
    }
  },
  {
    conceptSlug: 'khtn7-hoa-tri',
    blueprintId: 'khtn7-ch2-bp-002',
    description: 'Xác định hoá trị của nguyên tố',
    template: 'multiple-choice',
    difficulty: 1.5,
    generator: () => {
      // Simple example: HCl (Cl is I), NaCl (Na is I)
      const examples = [
        { compound: 'HCl', element: 'Cl', valency: 'I', explanation: 'H có hoá trị I, nên Cl có hoá trị I.' },
        { compound: 'NaCl', element: 'Na', valency: 'I', explanation: 'Cl có hoá trị I, nên Na có hoá trị I.' }
      ];
      
      const target = examples[Math.floor(Math.random() * examples.length)];
      
      return {
        question: `Trong hợp chất ${target.compound}, nguyên tố ${target.element} có hoá trị là bao nhiêu?`,
        options: ['I', 'II', 'III', 'IV'],
        correctAnswer: target.valency,
        explanation: target.explanation
      };
    }
  }
];
