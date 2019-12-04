<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $surname;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $url;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $file_name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $role;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $entry_text;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $mobile_phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $linkedin;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=10)
     */
    private $approve;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Invoice", mappedBy="membership", orphanRemoval=true)
     */
    private $invoice;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     */
    private $expired_at;


    public function __construct()
    {
        $this->invoice = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getFileName(): ?string
    {
        return $this->file_name;
    }

    public function setFileName(?string $file_name): self
    {
        $this->file_name = $file_name;

        return $this;
    }

    public function getApprove(): ?string
    {
        return $this->approve;
    }

    public function setApprove(string $approve): self
    {
        $this->approve = $approve;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLinkedin()
    {
        return $this->linkedin;
    }

    /**
     * @param mixed $linkedin
     */
    public function setLinkedin($linkedin): void
    {
        $this->linkedin = $linkedin;
    }

    /**
     * @return mixed
     */
    public function getMobilePhone()
    {
        return $this->mobile_phone;
    }

    /**
     * @param mixed $mobile_phone
     */
    public function setMobilePhone($mobile_phone): void
    {
        $this->mobile_phone = $mobile_phone;
    }

    /**
     * @return mixed
     */
    public function getEntryText()
    {
        return $this->entry_text;
    }

    /**
     * @param mixed $entry_text
     */
    public function setEntryText($entry_text): void
    {
        $this->entry_text = $entry_text;
    }

    /**
     * @return mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param mixed $role
     */
    public function setRole($role): void
    {
        $this->role = $role;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoice->contains($invoice)) {
            $this->invoice[] = $invoice;
            $invoice->setUser($this);
        }
        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoice->contains($invoice)) {
            $this->invoice->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getUser() === $this) {
                $invoice->setUser(null);
            }
        }
        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getExpiredAt(): ?\DateTimeInterface
    {
        return $this->expired_at;
    }

    public function setExpiredAt(\DateTimeInterface $expired_at): self
    {
        $this->expired_at = clone $expired_at;

        return $this;
    }
}
