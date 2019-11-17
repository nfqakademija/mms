<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $amount;

    /**
     * @ORM\Column(type="smallint")
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=3)
     */
    private $currency;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $payment_type;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $paytext;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $request_id;

    /**
     * @var \DateTime $createdAt
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var \DateTime $updatedAt
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $canceledAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Membership", inversedBy="invoice")
     * @ORM\JoinColumn(nullable=false)
     */
    private $membership;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;
        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): self
    {
        $this->currency = $currency;
        return $this;
    }

    public function getPaymentType(): ?string
    {
        return $this->payment_type;
    }

    public function setPaymentType(?string $payment_type): self
    {
        $this->payment_type = $payment_type;
        return $this;
    }

    public function getPaytext(): ?string
    {
        return $this->paytext;
    }

    public function setPaytext(?string $paytext): self
    {
        $this->paytext = $paytext;
        return $this;
    }

    public function getRequestId(): ?int
    {
        return $this->request_id;
    }

    public function setRequestId(?int $request_id): self
    {
        $this->request_id = $request_id;
        return $this;
    }

    public function setCanceledAt()
    {
        $this->canceledAt = new \DateTime("now");
        return $this;
    }

    public function setCreatedAt()
    {
        $this->createdAt = new \DateTime("now");
        return $this;
    }

    public function setUpdatedAt()
    {
        $this->updatedAt = new \DateTime("now");
        return $this;
    }

    public function getCanceledAt()
    {
        return $this->canceledAt;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function getMembership(): ?Membership
    {
        return $this->membership;
    }

    public function setMembership(?Membership $membership): self
    {
        $this->membership = $membership;
        return $this;
    }
}