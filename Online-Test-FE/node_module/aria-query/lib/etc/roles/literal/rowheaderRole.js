'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rowheaderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'th',
      attributes: [{
        name: 'scope',
        value: 'row'
      }]
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-sort': null
  },
  relatedConcepts: [],
  requireContextRole: ['row'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
};

exports.default = rowheaderRole;