var blogs = [
    {
        id: 1,
        title: "HashiCorp Vault with AWS Authentication",
        img: "assets/images/portfolio/p1.jpg",
        createdDate: "2024-01-27",
        content: `
        <p>HashiCorp Vault is crucial for applications as it provides a secure and centralized location for storing and accessing secrets like database credentials, API keys, and other sensitive data. This reduces the risk of exposure or leakage. Vault's ability to generate dynamic, short-lived secrets for certain systems further enhances security by ensuring that secrets are frequently rotated and less likely to be misused if compromised.</p>

        <p>Vault also offers encryption as a service, allowing applications to store encrypted data without having to handle the encryption and decryption process themselves. Additionally, Vault's fine-grained access control mechanisms specify who can access which secrets, providing a high level of control and security.</p>
        
        <p>Detailed audit logs from Vault provide crucial insights into who accessed what secrets, when, and why, which is particularly important for compliance with various data protection regulations. Lastly, Vault's ability to revoke secrets if they are detected to be compromised or no longer needed reduces the potential damage from a security breach. In essence, Vault plays a vital role in managing and securing an application's secrets, especially in cloud-based environments where applications often need to access various services and databases, each requiring its own set of credentials or secrets.</p>
        
        <h2>Set up:</h2>
        
        <ol>
            <li><strong>Install Vault:</strong>
                <ul>
                    <li>You can download Vault from the <a href="https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install" target="_blank">HashiCorp downloads page</a>.</li>
                </ul>
            </li>
            <li><strong>Start a Vault dev server:</strong>
                <ul>
                    <li>The Vault dev server is a built-in, pre-configured server useful for local testing and development. You can start it with the following command:
                        <pre><code>vault server -dev</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Set environment variables:</strong>
                <ul>
                    <li>Set the <code>VAULT_ADDR</code> and <code>VAULT_TOKEN</code> environment variables with the following command:
                        <pre><code>export VAULT_ADDR='http://127.0.0.1:8200'  # get this value from step 2
        export VAULT_TOKEN='hvs.Khdha32Fiaw3gCKKjJhrFb'  # get this value from step 2</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Interact with Vault:</strong>
                <ul>
                    <li>Use the Vault CLI to interact with Vault. For example, to check the status of your Vault server:
                        <pre><code>vault status</code></pre>
                    </li>
                    <p>The above command should provide the following result:</p>
                    <pre><code>Key        Value
        ---        -----
        Seal Type  shamir
        Initialized  true
        Sealed      false
        Total Shares 1
        Threshold   1
        Version     1.15.4
        Build Date  2023-12-04T17:45:28Z
        Storage Type inmem
        Cluster Name  vault-cluster-dfd6e918
        Cluster ID    6a05f618-1d77-9fb2-a443-4fda922d8723
        HA Enabled    false</code></pre>
                </ul>
            </li>
        </ol>
        
        <h2>CRUD on Vault:</h2>
        
        <p>To perform CRUD (Create, Read, Update, Delete) operations on HashiCorp's Vault, you can use the Vault CLI or HTTP API. Here's a basic example using the CLI:</p>
        
        <ul>
            <li><strong>Create (Write):</strong>
                <ul>
                    <li>You can write data to Vault using the <code>vault kv put</code> command. For example, to store a username and password:
                        <pre><code>vault kv put secret/myapp username='my-username' password='my-password'</code></pre>
                    </li>
                    <li>Each time you write to a secret in the KV secrets engine, Vault creates a new version of that secret.</li>
                </ul>
            </li>
            <li><strong>Read:</strong>
                <ul>
                    <li>You can read data from Vault using the <code>vault kv get</code> command. For example:
                        <pre><code>vault kv get secret/myapp</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Update:</strong>
                <ul>
                    <li>Updating is similar to creating. You just write to the same path again with the new data:
                        <pre><code>vault kv put secret/myapp username='new-username' password='new-password'</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Delete:</strong>
                <ul>
                    <li>You can delete data from Vault using the <code>vault kv delete</code> command. For example:
                        <pre><code>vault kv delete secret/myapp</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Destroy:</strong>
                <ul>
                    <li>When you destroy a version of a secret, it is permanently removed from Vault's storage. This operation cannot be undone. This is a hard delete operation:
                        <pre><code>vault kv destroy -versions=2 secret/my-secret</code></pre>
                    </li>
                </ul>
            </li>
        </ul>
        
        <h2>HashiCorp Vault Authentication:</h2>
        
        <p>HashiCorp Vault supports a variety of authentication methods, each designed for different use cases. Here are some of the most commonly used ones:</p>
        
        <ol>
            <li><strong>Token Authentication:</strong> This is the built-in/default authentication method. Each token is assigned a set of policies that dictate what the token can and cannot do.</li>
            <li><strong>Username & Password:</strong> This method allows users to authenticate using a username and password. It's not typically used for production deployments but can be useful for testing.</li>
            <li><strong>GitHub:</strong> This method allows users to authenticate with a GitHub personal access token.</li>
            <li><strong>LDAP & Active Directory:</strong> These methods allow users to authenticate using their LDAP or Active Directory credentials.</li>
            <li><strong>AWS:</strong> This method allows EC2 instances to authenticate with Vault using their instance metadata, or other AWS entities to authenticate via signed AWS API requests.</li>
            <li><strong>Google Cloud:</strong> This method allows authentication via Google Cloud Platform metadata.</li>
            <li><strong>Kubernetes:</strong> This method allows authentication based on the service account token provided by Kubernetes.</li>
            <li><strong>JWT/OIDC:</strong> This method allows authentication using JWTs (including OIDC tokens) from various identity providers.</li>
            <li><strong>Azure:</strong> This method allows Azure resources to authenticate with Vault.</li>
            <li><strong>Okta:</strong> This method allows users to authenticate with Okta credentials.</li>
        </ol>
        
        <h2>Authentication using AWS:</h2>
        
        <p>To authenticate with AWS, it has two options: IAM and EC2. AWS IAM (Identity and Access Management) credentials are used to authenticate with Vault. AWS automatically provides these credentials to its services like EC2 instances and Lambda functions. So, when these services need to authenticate with Vault, they can use the IAM credentials they already have. This method is flexible and aligns with best practices, so it's the recommended approach.</p>
        
        <p>To enable AWS authentication in HashiCorp's Vault with IAM, you can follow these steps:</p>
        
        <ol>
            <li><strong>Enable AWS Auth Method:</strong>
                <ul>
                    <li>First, you need to enable the AWS auth method in Vault. You can do this using the Vault CLI:
                        <pre><code>vault auth enable aws</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Configure AWS Auth Method:</strong>
                <ul>
                    <li>Next, you need to configure the AWS auth method with the AWS credentials that Vault will use to verify the AWS identity. You can do this using the Vault CLI:
                        <pre><code>vault write auth/aws/config/client secret_key=vCtSM8ZUEQ3mOFVZYPBQkf2sO6F/W7a5TVzrl3Oj access_key=AKIAJBRHKH6EVTTNXDHA</code></pre>
                    </li>
                    <li>The IAM user whose credentials are being used in the <code>vault write auth/aws/config/client</code> command needs to have an IAM policy that allows it to perform certain actions.</li>
                    <li>At a minimum, the IAM user needs the <code>iam:GetInstanceProfile</code>, <code>iam:GetUser</code>, <code>iam:GetRole</code>, and <code>sts:AssumeRole</code> permissions.</li>
                    <li>Here's an example of a policy that grants these permissions:
                        <pre><code>{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "ec2:DescribeInstances",
                        "iam:GetInstanceProfile",
                        "iam:GetUser",
                        "iam:GetRole",
                        "sts:AssumeRole"
                    ],
                    "Resource": "*"
                }
            ]
        }</code></pre>
                    </li>
                </ul>
            </li>
            <li><strong>Configure AWS IAM Role:</strong>
                <ul>
                    <li>Finally, you need to configure an AWS IAM role that applications can assume to authenticate with Vault. You can do this using the Vault CLI:
                        <pre><code>vault write auth/aws/role/dev-role auth_type=iam bound_iam_principal_arn=arn:aws:iam::123456789012:role/MyRole policies=dev max_ttl=1h</code></pre>
                    </li>
                    <li><code>auth_type=iam:</code> This tells Vault to use IAM authentication for this role.</li>
                    <li><code>bound_iam_principal_arn=arn:aws:iam::123456789012:role/MyRole:</code> This binds the Vault role to an AWS IAM role. Only the specified IAM role will be able to authenticate as this Vault role.</li>
                    <li>The IAM policies required for the AWS IAM role <code>arn:aws:iam::123456789012:role/MyRole</code> depend on what actions you want the role to be able to perform in AWS.</li>
                    <li>The role is used to make a <code>GetCallerIdentity</code> request to the AWS Security Token Service (STS). This is a basic operation that doesn't require any special permissions, so no specific IAM policy is needed for this operation.</li>
                    <li>However, if your application uses the IAM role to perform other actions in AWS, you would need to attach the appropriate IAM policies to the role. For example, if your application needs to read objects from an S3 bucket, you would need to attach a policy that grants <code>s3:GetObject</code> permission on that bucket.</li>
                    <li><code>policies=dev:</code> This assigns the dev policy to this role. Any AWS IAM principal that authenticates as this role will receive the permissions defined in the dev policy.</li>
                    <li>This policy is defined in Vault. Here is an example:
                        <pre><code>vault policy write dev - &lt;&lt;EOF
        path "secret/data/dev/*" {
            capabilities = ["read", "list"]
        }
        EOF</code></pre>
                        Please replace "secret/data/dev/*" with the actual path of your secrets and adjust the capabilities according to your needs. The capabilities can be "create", "read", "update", "delete", "list", "sudo", or "deny".
                    </li>
                    <li><code>max_ttl=1h:</code> This sets the maximum time-to-live for tokens issued under this role to 1 hour. After 1 hour, the token will no longer be valid, and a new one will need to be obtained.</li>
                    <li>Replace <code>arn:aws:iam::123456789012:role/MyRole</code> with the ARN of your actual AWS IAM role, and <code>dev</code> with the name of the policy you want to assign to this role.</li>
                </ul>
            </li>
        </ol>`
    }, 
   
]

function showBlogsInPage() {
    var blogContainer = $("#blogContainer");

    // Clear the blog container
    blogContainer.empty();

    // Loop through the blogs
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i];

        var blogThumbnailDiv = `<div class="col-sm-4">
                <div class="item" onclick="openBlogModal(${blog.id})">
                    <img src="${blog.img}" alt="portfolio image"/>
                    <div class="isotope-overlay">
                        <a>
                            ${blog.title}
                        </a>
                    </div><!-- /.isotope-overlay -->
                </div><!-- /.item -->
            </div>`;

        // Append the blog card to the blog container
        blogContainer.append(blogThumbnailDiv);
    }
}

// Function to open the modal with blog content
function openBlogModal(blogId) {
    // Set the blog content
    const blog = blogs.find(x => x.id == blogId);
    const blogHtml = `<div class="blog-title">${blog.title}</div>
                <div class="blog-date">${blog.createdDate}</div>
                <div class="blog-content">${blog.content}</div>`;
    $("#blog-modal-content").html(blogHtml);
    
    // Disable body scrolling    
    $("body").css("overflow", "hidden");  

    // Open the modal   
    $("#myModal").css("display", "block");
}

function closeBlogModal() {
    // Enable body scrolling    
    $("body").css("overflow", "auto");  

    $("#myModal").css("display", "none");
}

$(document).ready(function () {
    // Show the blogs in the page
    showBlogsInPage();
});