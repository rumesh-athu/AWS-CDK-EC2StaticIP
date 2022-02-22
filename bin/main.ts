#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Ec2Stack } from '../lib/ec2-stack';
import athu from '../enums/athu';

const app = new cdk.App();

new Ec2Stack(app, 'ec2', {
  ...athu.config,
});