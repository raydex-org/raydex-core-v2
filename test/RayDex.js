const { expect } = require("chai")
const hre = require("hardhat")

const NINTY_OCTILLIAN = 90000000000000000000000000000n
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('RayDex token contract', async () => {


    beforeEach(async () => {
        admin = await signer()
        dao = await rdxdao(admin)
       
    })

    it('name is RayDex', async () => {
        expect(await dao.name()).to.equal('RayDex')
    })

    it('symbol is RDX', async () => {
        expect(await dao.symbol()).to.equal('RDX')
    })

    it('zero votes for the admin by default', async () => {
        expect(await dao.getCurrentVotes(admin)).to.equal(0)
    })

    it('contract creator gets 90 Billion (9e28 / 1e10 * 1e18) RDX', async () => {
        expect(await dao.balanceOf(admin)).to.equal(NINTY_OCTILLIAN)
    })

    it('minting RDX not allowed', async () => {
        expect(dao.transferFrom(ZERO_ADDRESS, admin, 5)).to.be.revertedWith(
          'ERC20: transfer from the zero address'
        )
    })

    it('burning RDX not allowed', async () => {
        expect(dao.transferFrom(admin, ZERO_ADDRESS, 5)).to.be.revertedWith(
          'ERC20: transfer to the zero address'
        )
    })

    describe('delegate', async () => {
        beforeEach(async () => {
          admin = await signer()
          delegateOne = await other(1)
          delegateTwo = await other(2)
          dao = await rdxdao(admin)
        })
    
        it('admin assign 90 billion (all) votes to itself', async () => {
          expect(await dao.getCurrentVotes(admin)).to.equal(0)
    
          await dao.delegate(admin)
    
          expect(await dao.getCurrentVotes(admin)).to.equal(NINTY_OCTILLIAN)
        })

        it('admin assign 90 billion (all) votes to a delegate', async () => {
            expect(await dao.getCurrentVotes(admin)).to.equal(0)
            expect(await dao.getCurrentVotes(delegateOne)).to.equal(0)
      
            await dao.delegate(delegateOne)
      
            expect(await dao.getCurrentVotes(admin)).to.equal(0)
            expect(await dao.getCurrentVotes(delegateOne)).to.equal(NINTY_OCTILLIAN)
        })

        it('admin assign 90 billion (all) votes to a delegate, reassigns to another', async () => {
            expect(await dao.getCurrentVotes(admin)).to.equal(0)
            expect(await dao.getCurrentVotes(delegateOne)).to.equal(0)
            expect(await dao.getCurrentVotes(delegateTwo)).to.equal(0)
      
            await dao.delegate(delegateOne)
            await dao.delegate(delegateTwo)
      
            expect(await dao.getCurrentVotes(admin)).to.equal(0)
            expect(await dao.getCurrentVotes(delegateOne)).to.equal(0)
            expect(await dao.getCurrentVotes(delegateTwo)).to.equal(NINTY_OCTILLIAN)
        })
    
        
      })
    
      //TODO verify emitted events

  

  })



async function rdxdao(creatorAccount) {
  const dao  = await hre.ethers.deployContract("RayDex", [creatorAccount] )
  return dao.waitForDeployment()
 
}


async function signer() {

    const [signers] = await hre.ethers.getSigners()
    return signers.getAddress()
}


async function other(index) {
    const others = await ethers.getSigners()
    expect(others.length).is.greaterThan(index)
    return others[index].address
  }