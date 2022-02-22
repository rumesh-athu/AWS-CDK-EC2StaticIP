import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface Ec2StackProps extends StackProps {
  subnetId: any,
  staticIpforNwInf: any,
  staticIpforEc2: any,
  instanceType: any,
}

export class Ec2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: Ec2StackProps) {
    super(scope, id, props);

    // How to get the default VPC
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVpc', { isDefault: true })

    // How to create a Network Interface with Static IP address
    const staticIpNetworkInf = new ec2.CfnNetworkInterface(this, 'StaticIP1', {
      subnetId: props?.subnetId,
      privateIpAddress: props?.staticIpforNwInf,
    })

    // How to create an EC2 instance with Stact IP address
    const ec2Instace = new ec2.Instance(this, 'StaticIpInstance', {
      vpc,
      instanceType: new ec2.InstanceType(props?.instanceType),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      privateIpAddress: props?.staticIpforEc2,
    })

    // How to attache a Network Interface to an EC2 Instace
    new ec2.CfnNetworkInterfaceAttachment(this, 'attacheStaticInf', {
      deviceIndex: '1',
      instanceId: ec2Instace.instanceId,
      networkInterfaceId: staticIpNetworkInf.attrId,
      deleteOnTermination: false
    })
  }
}
