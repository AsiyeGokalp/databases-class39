const importData = async (client) => {
  try {
    await client.connect();
    await client.db('db_week4').collection('account').deleteMany();
    await client.db('db_week4').collection('account').insertMany(accounts);
    console.log('Accounts data imported successfully');
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const accounts = [
  {
    account_number: 101,
    balance: 3000,
    account_changes: [
      {
        change_number: 1,
        amount: 500,
        changed_date: '2020-10-10',
        remark: 'remark1',
      },      
    ],
  },
  {
    account_number: 102,
    balance: 5000,
    account_changes: [
      {
        change_number: 1,
        amount: 1000,
        changed_date: '2020-03-03',
        remark: 'remark2',
      },
      {
        change_number: 2,
        amount: 250,
        changed_date: '2020-09-09',
        remark: 'remark3',
      },
    ],
  },
  {
    account_number: 103,
    balance: 4000,
    account_changes: [
      {
        change_number: 1,
        amount: 150,
        changed_date: '2022-4-4',
        remark: 'remark4',
      },
      {
        change_number: 2,
        amount: 900,
        changed_date: '2022-10-10',
        remark: 'remark5',
      },
    ],
  },
];

module.exports = { importData };