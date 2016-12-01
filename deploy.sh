#!/usr/bin/env bash

now=$(/opt/google-cloud-sdk/bin/gcloud compute instances delete instance-2 --zone=us-central1-c --quiet)
echo "$now"
