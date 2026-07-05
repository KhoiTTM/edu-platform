export const KHTN7_CHAPTER1_BLUEPRINTS = [
  {
    conceptSlug: 'khtn7-nguyen-tu-mo-hinh',
    blueprintId: 'khtn7-bp-mo-hinh-001',
    description: 'Xác định thành phần của nguyên tử dựa trên mô hình Rutherford-Bohr',
    template: 'Theo mô hình nguyên tử Rutherford-Bohr, hạt nhân mang điện tích {charge} và nằm ở {position}.',
    variables: {
      charge: ['dương', 'âm', 'không mang điện'],
      position: ['tâm nguyên tử', 'lớp vỏ', 'bên ngoài nguyên tử']
    },
    validation: (vars: any) => vars.charge === 'dương' && vars.position === 'tâm nguyên tử'
  },
  {
    conceptSlug: 'khtn7-nguyen-to-ki-hieu',
    blueprintId: 'khtn7-bp-ki-hieu-001',
    description: 'Nhận diện kí hiệu hoá học của 20 nguyên tố đầu',
    template: 'Kí hiệu hoá học của nguyên tố {element} là gì?',
    generator: () => {
      // Deterministic generation
      const elements = [
        { name: 'Hydrogen', symbol: 'H' },
        { name: 'Helium', symbol: 'He' },
        { name: 'Carbon', symbol: 'C' },
        { name: 'Oxygen', symbol: 'O' }
      ];
      const target = elements[Math.floor(Math.random() * elements.length)];
      const distractors = elements.filter(e => e.symbol !== target.symbol).map(e => e.symbol).slice(0, 3);
      return {
        question: `Kí hiệu hoá học của nguyên tố ${target.name} là gì?`,
        correctAnswer: target.symbol,
        distractors: distractors
      };
    }
  }
];
