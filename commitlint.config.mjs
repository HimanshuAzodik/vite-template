export default {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|chore|docs|style|refactor|perf|test)(\([a-z0-9-]+\))?: (AZ-[0-9]+)-(.+)$/,
      headerCorrespondence: ['type', 'scope', 'ticket_id', 'title'],
    },
  },
  plugins: [
    {
      rules: {
        'title-pattern': (commit) => {
          const { type, scope, ticket_id, title, header } = commit;
          if (
            type === null ||
            scope === null ||
            ticket_id === null ||
            title === null
          ) {
            return [
              false,
              'Commit message must follow the format: type(scope): AZ-<ticket-id>-<description>',
            ];
          }
          console.log(`✅ Commit message ${header} is valid`);
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'title-pattern': [2, 'always'],
  },
};