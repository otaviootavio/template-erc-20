import { artifacts, ethers } from "hardhat";
import fs from "fs";
import path from "path";
import { Contract } from "ethers";

export async function main() {
    const erc20Factory = await ethers.getContractFactory("MockERC20");

    const erc20 = await erc20Factory.deploy("Mock ERC20 Token", "MOCK", 18);

    console.log("Mock ERC20 Token deployed to:", erc20.address);

    const vaultFactory = await ethers.getContractFactory("Vault");

    const vault = await vaultFactory.deploy(erc20.address);

    console.log("Vault deployed to:", vault.address);

    saveFrontendFiles([vault, erc20], ["Vault", "MockERC20"]);

    return { erc20, vault }
}

function saveFrontendFiles(contracts: Contract[], names: string[]) {
	const contractsDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
  
	if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
	}

  const result = []
  for (var i = 0; i < names.length; i++) {
    const ContractArtifact = artifacts.readArtifactSync(names[i]);
    result.push({ address: contracts[i].address, abi: ContractArtifact.abi })
  }
  
	fs.writeFileSync(
    path.join(contractsDir, "contract-config.json"),
    JSON.stringify(result, undefined, 2)
	);
}

main().then(() => {
  console.log('Everything is up and running!')
}).catch((error) => {
	console.error(error);
	process.exitCode = 1;
});