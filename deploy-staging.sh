echo "deploying front to staging ..."  && \
ng build --configuration=staging && \
ssh root@176.31.110.63 "rm -rf /opt/v8te-staging/front/validation/*" && \
scp -r docs/browser/* root@176.31.110.63:/opt/v8te-staging/front/validation/ && \
ssh root@176.31.110.63 "chown -R publish:publish /opt/v8te-staging/front/validation" && \
echo "... deployed to https://validation.beta.v8te.com"
