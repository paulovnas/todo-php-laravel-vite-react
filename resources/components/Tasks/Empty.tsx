import { createStyles, Text, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },
  body: {
    textAlign: "center",
    width: "100%",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },
}));

const Empty = () => {
  const { classes } = useStyles();

  return <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>UHUUULL...</Title>
        <Text weight={500} size="lg" mb={5}>
          Parece que você não tem nenhuma tarefa pendente!
        </Text>
        <Text size="sm" color="dimmed">
          Fique a vontade para adicionar novas tarefas ;)
        </Text>
      </div>
    </div>
}

export default Empty;