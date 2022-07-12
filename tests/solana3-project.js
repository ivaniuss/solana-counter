
const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

 
describe("solana3 counter program", () => {
  const provider = anchor.AnchorProvider.env();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  // Counter for the tests.
  const myAccount = anchor.web3.Keypair.generate();

  // Program for the tests.
  const program = anchor.workspace.Solana3Project;

  //initializing counter's value
  it("Creates a counter", async () => {
    await program.rpc.initialize({
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });

    let counterAccount = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.ok(counterAccount.count.toNumber() === 0);
  });

  it("Updates a counter", async () => {
    await program.rpc.update(new anchor.BN(1234),{
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });
    
    counterAccount = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(counterAccount.count.toNumber() === 1234);
    console.log(counterAccount)
  });

  it("increments a counter", async () => {
    await program.rpc.increment({
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });
    
    counterAccount = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log(counterAccount)
    assert.ok(counterAccount.count.toNumber() === 1235);
  });

  it("Decrements a counter", async () => {
      await program.rpc.decrement({
        accounts: {
          myAccount: myAccount.publicKey,
        },
      });
      
      counterAccount = await program.account.myAccount.fetch(myAccount.publicKey);
      console.log(counterAccount)
      assert.ok(counterAccount.count.toNumber() === 1234);
  });

});
